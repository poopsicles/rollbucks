/*!
The `RollBucks` backend.

This crate contains the backend for the `RollBucks` application hosted on the [Internet Computer](https://internetcomputer.org/).
*/

use candid::Principal;
use errors::RollBucksError;
use models::{Company, Employee};

use ic_ledger_types::{
    account_balance, AccountBalanceArgs, AccountIdentifier, MAINNET_LEDGER_CANISTER_ID,
};
use std::{cell::RefCell, collections::HashMap};

/// Error types for the `RollBucks` backend.
pub mod errors;
/// Common models for the `RollBucks` backend.
pub mod models;
/// Utility wrapper types for the `RollBucks` backend.
pub mod utils;

type StoreType = HashMap<Company, Vec<Employee>>;

thread_local! {
    /// The store for the RollBucks backend.
    ///
    /// Map companies to their employees.
    ///
    /// TODO: make it use stable storage
    static ROLLBUCKS_STORE: RefCell<StoreType> = RefCell::new(HashMap::new());
    static ROLLBUCKS_CANISTER_ID: String = "bkyz2-fmaaa-aaaaa-qaaaq-cai".to_string();
    static ROLLBUCKS_ADMIN_PRINCIPAL: Principal =
    Principal::from_text("5tohr-32mh7-p6ur6-z64rf-olndj-yxmeh-t2sha-vjyq4-xq6kd-xqks3-dqe")
        .expect("failed to create principal");
}

#[must_use]
#[ic_cdk::query]
/// Returns all companies and their employees.
pub fn get_all_companies() -> StoreType {
    ROLLBUCKS_STORE.with(|s| s.borrow().clone())
}

#[ic_cdk::update]
/// Adds a new company to the backing store.
///
/// # Errors
///
/// Returns a `RollBucksError::CompanyAlreadyExists` error if the company already exists.
pub async fn add_company(name: String) -> Result<usize, RollBucksError> {
    let c = Company::new(name.clone()).await;

    ROLLBUCKS_STORE.with(|s| {
        let mut s = s.borrow_mut();

        if s.keys().any(|s| s.get_name() == name) {
            Err(RollBucksError::CompanyAlreadyExists(name))
        } else {
            s.insert(c, Vec::new());
            Ok(s.len())
        }
    })
}

#[ic_cdk::update]
/// Adds a new employee to the backing store.
///
/// # Errors
///
/// Returns a `RollBucksError::CompanyNotFound` error if the company does not exist.
pub async fn add_employee(
    company_name: String,
    employee_full_name: String,
    employee_preferred_name: Option<String>,
) -> Result<Employee, RollBucksError> {
    let e = Employee::new(employee_full_name, employee_preferred_name).await;

    ROLLBUCKS_STORE.with(|s| {
        let mut s = s.borrow_mut();

        s.keys()
            .find(|s| s.get_name() == company_name)
            .cloned()
            .map_or(Err(RollBucksError::CompanyNotFound(company_name)), |c| {
                s.entry(c).and_modify(|es| es.push(e.clone()));

                Ok(e)
            })
    })
}

#[ic_cdk::query]
#[allow(clippy::needless_pass_by_value)]
/// Gets all employees for a company.
///
/// # Errors
///
/// Returns a `RollBucksError::CompanyNotFound` error if the company does not exist.
pub fn get_company_employees(company_name: String) -> Result<Vec<Employee>, RollBucksError> {
    ROLLBUCKS_STORE.with(|s| {
        let s = s.borrow_mut();

        s.keys().find(|s| s.get_name() == company_name).map_or_else(
            || Err(RollBucksError::CompanyNotFound(company_name.to_string())),
            |c| {
                s.get(c).map_or_else(
                    || unreachable!("company exists but no employees"),
                    |employees| Ok(employees.clone()),
                )
            },
        )
    })
}

/// Retrieves the amount of tokens in the company's wallet.
#[ic_cdk::update]
async fn get_company_wallet_balance(company_name: String) -> Result<u64, RollBucksError> {
    let principal = ROLLBUCKS_ADMIN_PRINCIPAL.with(|p| *p);
    // let canister =
    //     ROLLBUCKS_CANISTER_ID.with(|c| Principal::from_text(c).expect("failed to parse principal"));
    let canister = MAINNET_LEDGER_CANISTER_ID;

    let ident = ROLLBUCKS_STORE.with(|s| {
        s.borrow()
            .keys()
            .find(|c| c.get_name() == company_name)
            .cloned()
            .map_or_else(
                || Err(RollBucksError::CompanyNotFound(company_name.to_string())),
                |c| Ok(AccountIdentifier::new(&principal, &c.get_subaccount())),
            )
    })?;

    account_balance(canister, AccountBalanceArgs { account: ident })
        .await
        .map_or_else(
            |_| Err(RollBucksError::FailedToGetBalance(company_name)),
            |b| Ok(b.e8s()),
        )
}

// Enable Candid export
ic_cdk::export_candid!();

/*!
The `RollBucks` backend.

This crate contains the backend for the `RollBucks` application hosted on the [Internet Computer](https://internetcomputer.org/).
*/

use candid::Principal;
use errors::RollBucksError;
use ic_cdk::api::management_canister::main::raw_rand;
use models::{Company, Employee};

use ic_ledger_types::{
    account_balance, transfer, AccountBalanceArgs, AccountIdentifier, Memo, Timestamp, Tokens,
    TransferArgs, DEFAULT_FEE, MAINNET_LEDGER_CANISTER_ID,
};
use std::{cell::RefCell, collections::HashMap};
use utils::random_memo;

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
/// Returns the number of companies in the store.
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
/// Returns the new employee.
///
/// # Errors
///
/// Returns a `RollBucksError::CompanyNotFound` error if the company does not exist.
pub async fn add_employee(
    company_name: String,
    employee_full_name: String,
    employee_preferred_name: Option<String>,
    employee_wage: u64,
) -> Result<Employee, RollBucksError> {
    let e = Employee::new(employee_full_name, employee_preferred_name, employee_wage).await;

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
            || Err(RollBucksError::CompanyNotFound(company_name.clone())),
            |c| {
                s.get(c).map_or_else(
                    || unreachable!("company exists but no employees"),
                    |employees| Ok(employees.clone()),
                )
            },
        )
    })
}

#[ic_cdk::update]
/// Retrieves the amount of tokens in the company's wallet.
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
                || Err(RollBucksError::CompanyNotFound(company_name.clone())),
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

#[ic_cdk::update]
/// Pays all employees of a company.
///
/// Returns the total amount paid.
///
/// # Errors
/// - When there isn't enough tokens to pay everyone.
/// - When the transfer fails.
//TODO: add receipts?
pub async fn pay_employees(company_name: String) -> Result<u64, RollBucksError> {
    let principal = ROLLBUCKS_ADMIN_PRINCIPAL.with(|p| *p);

    let company_balance = get_company_wallet_balance(company_name.clone())
        .await
        .map_err(|_| RollBucksError::FailedToGetBalance(company_name.clone()))?;

    let company_subaccount = ROLLBUCKS_STORE.with(|s| {
        s.borrow()
            .keys()
            .find(|c| c.get_name() == company_name)
            .cloned()
            .map_or_else(
                || Err(RollBucksError::CompanyNotFound(company_name.to_string())),
                |c| Ok(c.get_subaccount()),
            )
    })?;

    let employees = get_company_employees(company_name.clone())?;

    let total_wages: u64 = employees.iter().map(models::Employee::get_wage).sum();

    if company_balance < total_wages {
        return Err(RollBucksError::InsufficientFunds(company_name));
    }

    let mut total = 0;

    for e in employees {
        transfer(
            MAINNET_LEDGER_CANISTER_ID,
            TransferArgs {
                memo: random_memo().await,
                amount: Tokens::from_e8s(e.get_wage()),
                fee: DEFAULT_FEE,
                from_subaccount: Some(company_subaccount),
                to: AccountIdentifier::new(&principal, &e.get_subaccount()),
                created_at_time: Some(Timestamp {
                    timestamp_nanos: ic_cdk::api::time(),
                }),
            },
        )
        .await
        .map_err(|_| RollBucksError::TransferFailed(e.get_full_name(), company_name.clone()))?
        .map_err(|_| RollBucksError::TransferFailed(e.get_full_name(), company_name.clone()))?;

        total += e.get_wage();
        total += DEFAULT_FEE.e8s();
    }

    Ok(total)
}

// Enable Candid export
ic_cdk::export_candid!();

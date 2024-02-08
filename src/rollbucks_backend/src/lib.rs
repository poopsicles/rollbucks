/*!
The `RollBucks` backend.

This crate contains the backend for the `RollBucks` application hosted on the [Internet Computer](https://internetcomputer.org/).
*/

use errors::RollBucksError;
use models::{Company, Employee};

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
    static STORE: RefCell<StoreType> = RefCell::new(HashMap::new());
}

#[must_use]
#[ic_cdk::query]
/// Returns all companies and their employees.
pub fn get_all_companies() -> StoreType {
    STORE.with(|s| s.borrow().clone())
}

#[ic_cdk::update]
/// Adds a new company to the backing store.
///
/// # Errors
///
/// Returns a `RollBucksError::CompanyAlreadyExists` error if the company already exists.
pub fn add_company(name: String) -> Result<usize, RollBucksError> {
    STORE.with(|s| {
        let mut s = s.borrow_mut();

        if s.keys().any(|s| s.get_name() == name) {
            Err(RollBucksError::CompanyAlreadyExists(name))
        } else {
            s.insert(Company::new(name), Vec::new());
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
pub fn add_employee(
    company_name: String,
    employee_full_name: String,
    employee_preferred_name: Option<String>,
) -> Result<Employee, RollBucksError> {
    STORE.with(|s| {
        let mut s = s.borrow_mut();

        s.keys()
            .find(|s| s.get_name() == company_name)
            .cloned()
            .map_or(Err(RollBucksError::CompanyNotFound(company_name)), |c| {
                let e = Employee::new(employee_full_name, employee_preferred_name);
                s.entry(c).and_modify(|es| es.push(e.clone()));

                Ok(e)
            })
    })
}

// Enable Candid export
ic_cdk::export_candid!();

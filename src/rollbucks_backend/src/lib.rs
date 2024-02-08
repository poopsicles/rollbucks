use errors::RollBucksError;
use models::{Company, Employee};

use std::{cell::RefCell, collections::HashMap};

pub mod errors;
pub mod models;
pub mod utils;

type StoreType = HashMap<Company, Vec<Employee>>;

thread_local! {
    static STORE: RefCell<StoreType> = RefCell::new(HashMap::new());
}

#[ic_cdk::query]
#[must_use]
pub fn get_all_companies() -> StoreType {
    STORE.with(|s| s.borrow().clone())
}

#[ic_cdk::update]
pub fn add_company(name: String) -> Result<usize, RollBucksError> {
    STORE.with(|s| {
        let mut s = s.borrow_mut();

        if s.keys().any(|s| s.get_name() == name) {
            Err(RollBucksError::CompanyAlreadyExists(name))
        } else {
            s.insert(Company::new(&name), Vec::new());
            Ok(s.len())
        }
    })
}

#[ic_cdk::update]
pub fn add_employee(
    company_name: String,
    employee_name: String,
) -> Result<Employee, RollBucksError> {
    STORE.with(|s| {
        let mut s = s.borrow_mut();

        s.keys()
            .find(|s| s.get_name() == company_name)
            .cloned()
            .map_or(Err(RollBucksError::CompanyNotFound(company_name)), |c| {
                let e = Employee::new(employee_name);
                s.entry(c).and_modify(|es| es.push(e.clone()));

                Ok(e)
            })
    })
}

// Enable Candid export
ic_cdk::export_candid!();

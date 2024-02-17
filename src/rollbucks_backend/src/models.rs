use crate::utils::{random_subaccount, RollBucksOffsetDateTime};

use candid::CandidType;
use ic_ledger_types::Subaccount;

/// A simple struct representing an employee.
///
/// Employees have a full name (used for formal interactions, think legal),
/// a preferred name (used for friendlier ones), and a date of registration.
///
/// TODO: make it use references
#[derive(Clone, CandidType, PartialEq, Eq, Hash)]
pub struct Employee {
    full_name: String,
    preferred_name: Option<String>,
    date_registered: RollBucksOffsetDateTime,
    subaccount: Subaccount,
    wage: u64,
}

impl Employee {
    #[must_use]
    /// Creates a new `Employee` with the given full name and (optional) preferred name.
    pub async fn new(full_name: String, preferred_name: Option<String>, wage: u64) -> Self {
        Self {
            full_name,
            preferred_name,
            wage,
            date_registered: RollBucksOffsetDateTime::now(),
            subaccount: random_subaccount().await,
        }
    }

    #[must_use]
    /// Returns the full name of the `Employee`.
    pub fn get_full_name(&self) -> String {
        self.full_name.clone()
    }

    #[must_use]
    /// Returns the preferred name of the `Employee`, or the full name if no preferred name is set.
    pub fn get_name(&self) -> String {
        self.preferred_name
            .clone()
            .unwrap_or_else(|| self.full_name.clone())
    }

    #[must_use]
    /// Returns the wages of the `Employee`
    pub const fn get_wage(&self) -> u64 {
        self.wage
    }

    #[must_use]
    /// Returns the subaccount of the `Employee`.
    pub const fn get_subaccount(&self) -> Subaccount {
        self.subaccount
    }
}

/// A simple struct representing a company.
///
/// Companies have a legal name.
///
/// TODO: make it use references
#[derive(Clone, CandidType, PartialEq, Eq, Hash)]
pub struct Company {
    legal_name: String,
    subaccount: Subaccount,
}

impl Company {
    #[must_use]
    /// Creates a new `Company` with the given legal name.
    pub async fn new(legal_name: String) -> Self {
        Self {
            legal_name,
            subaccount: random_subaccount().await,
        }
    }

    #[must_use]
    /// Returns the legal name of the `Company`.
    pub fn get_name(&self) -> String {
        self.legal_name.clone()
    }

    #[must_use]
    /// Returns the subaccount of the `Company`.
    pub const fn get_subaccount(&self) -> Subaccount {
        self.subaccount
    }
}

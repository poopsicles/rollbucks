use candid::CandidType;

use crate::utils::RollBucksOffsetDateTime;

/// A simple struct representing an employee.
///
/// Employees have a full name (used for formal interactions, think legal),
/// a preferred name (used for friendlier ones), and a date of registration.
///
/// TODO: add wallet/principal
/// TODO: make it use references
#[derive(Clone, CandidType, PartialEq, Eq, Hash)]
pub struct Employee {
    full_name: String,
    preferred_name: Option<String>,
    date_registered: RollBucksOffsetDateTime,
}

impl Employee {
    /// Creates a new `Employee` with the given full name and (optional) preferred name.
    #[must_use]
    pub fn new(full_name: String, preferred_name: Option<String>) -> Self {
        Self {
            full_name,
            preferred_name,
            date_registered: RollBucksOffsetDateTime::now(),
        }
    }

    /// Returns the full name of the `Employee`.
    #[must_use]
    pub fn get_full_name(&self) -> String {
        self.full_name.clone()
    }

    /// Returns the preferred name of the `Employee`, or the full name if no preferred name is set.
    #[must_use]
    pub fn get_name(&self) -> String {
        self.preferred_name
            .clone()
            .unwrap_or_else(|| self.full_name.clone())
    }
}

/// A simple struct representing a company.
///
/// Companies have a legal name.
///
/// TODO: add wallet/principal
/// TODO: make it use references
#[derive(Clone, CandidType, PartialEq, Eq, Hash)]
pub struct Company {
    legal_name: String,
}

impl Company {
    /// Creates a new `Company` with the given legal name.
    #[must_use]
    pub const fn new(legal_name: String) -> Self {
        Self { legal_name }
    }

    /// Returns the legal name of the `Company`.
    #[must_use]
    pub fn get_name(&self) -> String {
        self.legal_name.clone()
    }
}

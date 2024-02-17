use candid::CandidType;
use thiserror::Error;

/// The error type for `RollBucks`.
#[derive(Debug, Error, CandidType)]
pub enum RollBucksError{
    #[error("Something went wrong")]
    /// An unknown error occurred, We're not sure what.
    Unknown,
    #[error("Company `{0}` not found")]
    /// The company was not found in the backing store.
    CompanyNotFound(String),
    #[error("Company `{0}` already exists")]
    /// The company already exists in the backing store.
    CompanyAlreadyExists(String),
    #[error("Failed to get balance for company `{0}`")]
    /// We couldn't get the balance for the company from the ledger.
    FailedToGetBalance(String),
}

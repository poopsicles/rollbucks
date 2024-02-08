use candid::CandidType;
use thiserror::Error;

/// The error type for `RollBucks`.
#[derive(Debug, Error, CandidType)]
pub enum RollBucksError{
    #[error("Company `{0}` not found")]
    CompanyNotFound(String),
    #[error("Company `{0}` already exists")]
    CompanyAlreadyExists(String),
    #[error("Something went wrong")]
    Unknown,
}

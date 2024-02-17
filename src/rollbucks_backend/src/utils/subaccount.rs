use ic_cdk::api::management_canister::main::raw_rand;
use ic_ledger_types::Subaccount;

/// Creates a new Subaccount, which can hold tokens.
///
/// # Panics
/// - When generating random bytes fails
pub async fn new_subaccount() -> Subaccount {
    Subaccount(
        raw_rand()
            .await
            .expect("failed to get random bytes")
            .0
            .try_into()
            .expect("failed to transform vec to [u8]"),
    )
}

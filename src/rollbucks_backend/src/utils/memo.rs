use ic_cdk::api::management_canister::main::raw_rand;
use ic_ledger_types::Memo;

/// Creates a new Subaccount, which can hold tokens.
///
/// # Panics
/// - When generating random bytes fails
pub async fn random_memo() -> Memo {
    Memo(u64::from_le_bytes(
        raw_rand().await.expect("failed to get random bytes").0[..8]
            .try_into()
            .expect("failed to get [u8] from vec"),
    ))
}

use std::rc::Rc;

use candid::{
    types::{Type, TypeInner},
    CandidType,
};
use serde::Deserialize;
use time::OffsetDateTime;

/// This is a wrapper around `time::OffsetDateTime` that allows it to be used as a Candid type.
#[derive(Clone, PartialEq, Eq, Hash, Deserialize)]
pub struct RollBucksOffsetDateTime {
    #[serde(deserialize_with = "deserialize_offset_date_time")]
    inner: OffsetDateTime,
}

impl CandidType for RollBucksOffsetDateTime {
    fn _ty() -> Type {
        Type(Rc::new(TypeInner::Nat64))
    }

    /// Serializes the `RollBucksOffsetDateTime` as a `nat64`.
    fn idl_serialize<S>(&self, serializer: S) -> Result<(), S::Error>
    where
        S: candid::types::Serializer,
    {
        serializer.serialize_nat64(
            self.inner
                .unix_timestamp_nanos()
                .try_into()
                .expect("failed to cast i128 to u64"),
        )
    }
}

impl RollBucksOffsetDateTime {
    /// Returns the current time as a `RollBucksOffsetDateTime`.
    ///
    /// # Panics
    ///
    /// Panics if the current time cannot be stored as an `OffsetDateTime`.
    #[must_use]
    pub fn now() -> Self {
        let x = ic_cdk::api::time();

        Self {
            inner: OffsetDateTime::from_unix_timestamp_nanos(x.into())
                .expect("failed to construct RollBucksOffsetDateTime"),
        }
    }
}

/// Deserializes a `u64` as a `RollBucksOffsetDateTime`.
fn deserialize_offset_date_time<'de, D>(deserializer: D) -> Result<OffsetDateTime, D::Error>
where
    D: serde::Deserializer<'de>,
{
    let x = u64::deserialize(deserializer)?;

    Ok(OffsetDateTime::from_unix_timestamp_nanos(x.into())
        .expect("failed to construct OffsetDateTime"))
}

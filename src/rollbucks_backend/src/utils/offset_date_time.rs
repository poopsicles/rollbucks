
use std::{rc::Rc, time::Instant};

use candid::types::{Type, TypeInner};

#[derive(Clone, PartialEq, Hash)]
pub struct RollBucksOffsetDateTime {
    inner: time::OffsetDateTime,
}

impl candid::CandidType for RollBucksOffsetDateTime {
    fn _ty() -> Type {
        Type(Rc::new(TypeInner::Nat64))
    }

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
    pub fn now() -> Self {
        let x = ic_cdk::api::time();

        Self {
            inner: time::OffsetDateTime::from_unix_timestamp_nanos(x.into())
                .expect("failed to construct RollBucksOffsetDateTime"),
        }
    }
}

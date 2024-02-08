use candid::CandidType;

use crate::utils::offset_date_time::RollBucksOffsetDateTime;

#[derive(Clone, CandidType, PartialEq, Hash)]
pub struct Employee {
    name: String,
    date_registered: RollBucksOffsetDateTime,
}

impl Employee {
    pub fn new(name: String) -> Self {
        Self {
            name,
            date_registered: RollBucksOffsetDateTime::now(),
        }
    }
}

#[derive(Clone, CandidType, PartialEq, Eq, Hash)]
pub struct Company {
    name: String,
    // funds: Decimal
    // employees: Vec<Employee>,
}


impl Company {
    pub fn new(name: &str) -> Self {
        Self {
            name: name.to_string(),
            // funds: 0.into()
            // employees: Vec::new(),
        }
    }

    pub fn get_name(&self) -> String {
        self.name.clone()
    }

    // pub fn add_employee(&mut self, name: &str) {
    //     self.employees.push(Employee::new(name));
    // }

    // pub fn get_employees(&self) -> Vec<Employee> {
    //     self.employees.clone()
    // }
}


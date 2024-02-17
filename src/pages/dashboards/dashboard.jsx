import { useParams } from "react-router-dom"
import { EmployeeDashboard } from "./employee";
import { OrgDashboard } from "./orgdashboard";

export const Dashboard = () =>{
    const {type: userType} = useParams();
    console.log(userType)
    return(
        <>
    {userType=="employee" ? <EmployeeDashboard/> : userType == "organization" ? <OrgDashboard/> : <h1 className="text-3xl">Invalid Credentials</h1>}
        </>
    )
}
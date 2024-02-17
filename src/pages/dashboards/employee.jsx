import BasicTable from "../../components/table"
import logo from '../../assets/icons/rollbxslogo.svg'
import profilepic from '../../assets/images/profilepic.png'
import file from '../../assets/icons/file.svg'
import filter from '../../assets/icons/filter.svg'
import dolls from '../../assets/icons/dolls.svg'
import convert from '../../assets/icons/convert.svg'
export const EmployeeDashboard = () => {
    return (
        <div className="h-screen w-full pt-9 pb-4 px-12 flex flex-col items-center justify-center gap-y-5 font-body bg-white-400">
        <div className=" h-1/5 flex gap-x-5 font-body w-full">
            <div className="w-2/3 h-full bg-slate-50 rounded-[10px] pr-8 pl-6 py-2 flex flex-row gap-y-2">
                <div className="w-1/4 flex flex-col h-full px-4 pt-2 gap-y-2">
                    <div className="w-14"><img src={profilepic} ></img></div>
                    <div className="text-[12px] font-semibold"> Warren Wade </div>
                </div>
                <div className="w-3/4">
                    <div className=" px-8 text-[12px] flex flex-col flex-wrap gap-4 h-full ">
                        <div>
                            <p>Company</p>
                            <p className="font-semibold">Financial Trade FC</p>
                        </div>
                        <div>
                            <p>Email</p>
                            <p className="font-semibold">wade.warren@fctrade.com</p>
                        </div>
                        <div>
                            <p>ICP address</p>
                            <div className="flex gap-x-1">
                                <p className="font-semibold">wiqownqowien12930</p>
                                <div className="w-4"><img src={file} className="w-full h-full"></img></div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div className=" text-[12px] w-1/3 flex flex-col bg-slate-50 rounded-[10px] p-4">
                <p>Available Balance</p>
                <div className="flex justify-between">
                    <p className="text-[28px] font-bold">100.245 ICP</p>
                    <img src={convert} className="w-8"></img>
                </div>
                <div><img src={dolls} className="w-20"></img></div>
            </div>
        </div>

        <div className="px-4 h-4/5 w-full flex flex-col gap-y-2"> 
            <div className="flex justify-between">
                <p className="text-2xl font-bold">Recent Payments</p>
                <img src={filter} ></img>
            </div>
            <BasicTable/>
            
        </div>

        <div className="h-[50px]">
        <img src={logo} alt="Rollbucks Logo" className="w-[80px] h-full" />
        </div>
        </div>
    )
}
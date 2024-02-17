import logo from '../assets/icons/logo.svg';
import grid from '../assets/loginGrid.svg';
import arrows from '../assets/arrows.svg';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { useState } from 'react';

export const Login = () => {
    let isMobile = useMediaQuery("(max-width: 1024px)");
    const [isOrg, setOrg] = useState(false);

    const handleOrganization = () =>{
        setOrg (prev => !prev)
    }
    return (
        <section className='flex h-screen w-full overflow-hidden text-black-400'>

            {!isMobile ? <div className="h-full w-4/5 flex items-center justify-center bg-gradient-to-br from-[#F4DDAC] via-[#EEDEE0] to-blue relative">
                <h1 className="z-[2] text-3xl lg:text-[90px] font-display font-bold lg:leading-[90px]">Seamless <br /> Payments, <br /> Global <br /> Exposure</h1>
                <img src={grid} alt="Login Grid" className="absolute top-0 right-0" />
                <img src={arrows} alt="Arrows" className="absolute bottom-0 right-0 w-[40%]" />
            </div> : null}

            <div className="h-screen flex flex-col items-center bg-white-400 w-full xl:w-3/5">
                <div className="flex flex-col justify-center p-9 w-md">
                    <form method="POST" className="flex flex-col w-sm">

                        <img src={logo} alt="Rollbucks Logo" className="w-24 self-center" />

                        <div className="my-12"></div>

                        {/* Form Header */}
                        <div>
                            <div className="flex items-center">
                                <h2 className="text-3xl font-display font-semibold">Hey, Welcome Back! </h2>
                                <span className="text-4xl">👋</span>
                            </div>
                            <div className="my-1.5"></div>
                            <p>Enter your details to gain access to your account.</p>
                        </div>

                        <div className="my-6"></div>

                        <input
                            type="text"
                            placeholder= {isOrg? 'Company mail' : 'Company name'}
                            className="px-4 py-3 rounded-md text-sm font-body bg-white-500 shadow-sm border border-white-600"
                            onChange={(event) => setEmail(event.target.value)}
                        />

                        <div className="my-2"></div>

                        <input
                            type="password"
                            placeholder="Password"
                            className="px-4 py-3 rounded-md bg-slate-100 text-sm font-body bg-white-500 shadow-sm border border-white-600"
                            onChange={(event) => setPassword(event.target.value)}
                        />

                        <div className="my-7"></div>

                        <input
                            onClick={() => { }}
                            type="submit"
                            value="Submit"
                            className="mt-2 p-4 rounded-md font-display text-sm text-white-400 bg-black-400"
                        />
                        <div>
                        {isOrg? <div className= "my-1 py-2 text-center">or <a onClick={handleOrganization}>login as an organization</a></div>
                         : <div className= "my-1 py-2 text-center">or <a onClick={handleOrganization}>login as an employee</a></div>}
                        </div>
                        
                       
                    </form>
                </div>
            </div>
        </section>
    )
}

function Separator(props) {
    let x = props.x ? props.x : 0;
    let y = props.y ? props.y : 0;

    return (
        <div className={`m-0 mx-${x} my-${y}`}></div>
    )
}
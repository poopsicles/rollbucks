
import { useState } from 'react';
import logo from '../assets/icons/logo.svg';
import grid from '../assets/loginGrid.svg';
import navigation from '../assets/navigation.svg';
import { EyeOpenIcon, EyeClosedIcon } from '@radix-ui/react-icons';
import { useMediaQuery } from '../hooks/useMediaQuery';

export const Register = () => {
    let isMobile = useMediaQuery("(max-width: 1024px)");
    const [password, setPassword] = useState("")
    const [confirm, confirmPassword] = useState("")
    const [isVisible, setVisible] = useState(false)
    const [isVisibleConfirm, setVisibleConfirm] = useState(false)


    const handleHidePassword = (e) => {
        e.preventDefault()
        setVisible(prev => !prev)
    }
    const handleHidePasswordConfirm = (e) => {
        e.preventDefault()
        setVisibleConfirm(prev => !prev)
    }

    return (
        <section className='flex h-screen w-full overflow-hidden text-black-400'>

            {!isMobile ? <div className="h-full w-3/5 flex items-center justify-center bg-gradient-to-br from-[#F4DDAC] via-[#EEDEE0] to-blue relative">
                <h1 className="z-[2] text-3xl lg:text-[90px] font-display font-bold lg:leading-[90px]">Crossing <br /> Borders</h1>
                <img src={grid} alt="Login Grid" className="absolute top-0 right-0" />
                <img src={navigation} alt="Pin" className="absolute bottom-0 right-0 w-[40%]" />
            </div> : null}

            <div className="h-screen flex flex-col items-center bg-white-400 w-full xl:w-3/5">
                <div className="flex flex-col justify-center p-9 w-md">
                    <form method="POST" className="flex flex-col w-sm">

                        <img src={logo} alt="Rollbucks Logo" className="w-24 self-center" />

                        <div className="my-12"></div>

                        {/* Form Header */}
                        <div>
                            <div className="flex items-center">
                                <h2 className="text-3xl font-display font-semibold">Great to have you!</h2>
                                <span className="text-4xl">😃</span>
                            </div>
                            <div className="my-1.5"></div>
                            <p>Enter your details to gain access to your account.</p>
                        </div>

                        <div className="my-6"></div>

                        <input
                            type="text"
                            placeholder="Company Name"
                            className="px-4 py-3 rounded-md text-sm font-body bg-white-500 shadow-sm border border-white-600"
                            onChange={(event) => setEmail(event.target.value)}
                        />

                        <div className="my-2"></div>

                        <div className="px-4 py-3 rounded-md bg-slate-100 flex items-center justify-between text-sm font-body bg-white-500 outline-none shadow-sm border border-white-600">
                            <input
                                type= {isVisible? "text" : "password"}
                                placeholder="Password"
                                className='bg-transparent outline-none w-full'
                                onChange={(event) => setPassword(event.target.value)}
                            />
                            {isVisible ? <button onClick={handleHidePassword}><EyeOpenIcon/></button> : <button onClick={handleHidePassword}><EyeClosedIcon/></button>}
                        </div>

                        <div className="my-2"></div>

                        <div className={`px-4 py-3 rounded-md bg-slate-100 flex items-center justify-between text-sm font-body bg-white-500 shadow-sm border ${password !== confirm? "border-red-400" : " border-white-600"}`}>
                        <input
                            type= {isVisibleConfirm? "text" : "password"}
                            placeholder="Confirm Password"
                            className='bg-transparent outline-none w-full'
                            onChange={(event) => confirmPassword(event.target.value)}
                        />
                        {isVisibleConfirm ? <button onClick={handleHidePasswordConfirm}><EyeOpenIcon/></button> : <button onClick={handleHidePasswordConfirm}><EyeClosedIcon/></button>}
                        </div>

                        <div className="my-7"></div>

                        <input
                            onClick={() => { }}
                            type="submit"
                            value="Submit"
                            className="mt-2 p-4 rounded-md font-display text-sm text-white-400 bg-black-400"
                        />
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
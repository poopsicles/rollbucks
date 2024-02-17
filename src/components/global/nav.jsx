import { Link } from 'react-router-dom';
import logo from '../../assets/icons/logo.svg';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useState } from 'react';

export const Nav = () => {
    let isMobile = useMediaQuery("(max-width: 768px)");
    const [showMenu, setShowMenu] = useState(false);

    const handleShowMenu = () => {
        setShowMenu(prev => !prev);
    }

    const desktopMenu = <nav className='font-body flex items-center text-sm justify-between px-[32px] py-[20px] border-b-[2px] border-white-500 bg-white-400 z-[1000] fixed w-full'>
        <img src={logo} alt='logo icon' width={'102px'} />

        <ul className='flex items-center gap-8 pl-10'>
            <li className='hover:underline'><a href='/#home' className='hover:text-blue-300'>Home</a></li>
            <li className='hover:underline'><a href='/#about' className='hover:text-blue-300'>About</a></li>
            <li className='hover:underline'><a href='/#features' className='hover:text-blue-300'>Features</a></li>
            <Link className='hover:underline' to='dashboard/employee'>Dashboard</Link>
            {/* <li><a href='/#faq' className='hover:text-blue-300'>FAQ</a></li>
            <li><a href='/#contact' className='hover:text-blue-300'>Contact</a></li> */}
        </ul>

        <span className='space-x-2'>
            <Link to='login' className='font-medium text-white-400 rounded-xl py-4 px-3 text-sm bg-black-400 hover:bg-yellow hover:text-black-400'>Log in</Link>
            <Link to='register' className='font-medium text-black-400 rounded-xl py-4 px-3 text-sm border-[1px] border-black-400 hover:bg-yellow hover:border-yellow'>Create free account</Link>
        </span>
    </nav>

    const mobileMenu = <nav className='font-body flex items-center text-sm justify-between px-[32px] py-[20px] border-b-[2px] border-white-500 bg-white-400 z-[1000] fixed w-full'>
        <img src={logo} alt='logo icon' width={'102px'} />
        <div className={`${showMenu ? 'opacity-100 left-0' : 'opacity-0 left-[-200%]'} absolute top-0 w-full h-screen bg-black-400 bg-opacity-50 backdrop-blur-sm transition-all duration-500 ease-in-out`}>
            <div className={`${showMenu ? 'right-0' : 'right-[-100%]'} flex flex-col justify-between absolute top-0 transition-all duration-300 ease-in-out bg-black-400 p-8 h-full w-3/5 text-white-400 font-display text-3xl`}>
                <button onClick={handleShowMenu}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <ul className='space-y-4'>
                    <li onClick={handleShowMenu}><a href='/#home'>Home</a></li>
                    <li onClick={handleShowMenu}><a href='/#about'>About</a></li>
                    <li onClick={handleShowMenu}><a href='/#features'>Features</a></li>
                    <li onClick={handleShowMenu}><a href='/#faq'>FAQ</a></li>
                    <li onClick={handleShowMenu}><a href='/#contact'>Contact</a></li>
                </ul>

                <span className='space-y-2'>
                    <Link to='login' className='flex justify-center font-medium text-black-400 rounded-xl py-3 px-2 text-xs bg-yellow hover:bg-white-400 '>Log in</Link>
                    <Link to='register' className='flex justify-center font-medium text-white-400 rounded-xl py-3 px-2 text-xs border-[1px] border-white-400 hover:bg-yellow hover:border-yellow'>Create free account</Link>
                </span>
            </div>
        </div>
        <button onClick={handleShowMenu}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
            </svg>
        </button>
    </nav>

    return (
        <>
            {isMobile ? mobileMenu : desktopMenu}
        </>
    )
}
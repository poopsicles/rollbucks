import { Link } from 'react-router-dom';
import gridLight from '../../assets/gridLight.svg';
import logo from '../../assets/icons/logoFooter.svg';
import up from '../../assets/icons/up.svg';

export const Footer = () => {
    return (
        <footer className="p-[32px] h-screen">
            <section
                style={{
                    backgroundImage: `url(${gridLight})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: '#22262B',
                }}
                className='h-4/5 rounded-[17px] flex flex-col gap-8 items-center justify-center text-white-400'
            >
                <h1 className="text-2xl lg:text-6xl font-bold text-center">Seamless Pay for <br /> African Talent</h1>
                <Link to="register" className="font-bold font-body text-black-400 rounded-xl py-4 px-3 text-xs lg:text-sm bg-yellow hover:bg-white-400 hover:text-black-400">Join RollBucks. Now</Link>
            </section>
            <section className='flex flex-col-reverse lg:flex-row items-center justify-between h-1/5'>
                <p className='font-light text-[8px] text-white-600'>© All Rights Reserved. 2023, RollBucks.</p>
                <img src={logo} alt='logo icon' width={'100px'} className='mr-10' />
                <a href="/#home" className="flex items-center justify-center -mt-6 animate-bounce sticky">
                    <img src={up} alt="scroll up button" />
                </a>
            </section>
        </footer>
    )
}
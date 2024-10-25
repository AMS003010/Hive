import { Quicksand } from 'next/font/google';
import Image from 'next/image';

const quicksand = Quicksand({ subsets: ['latin'] })

import LogoImage from '../images/hive_logo.png';

export default function NavBar () {
    return(
        <div className={`${quicksand.className} flex items-center justify-between text-black p-4 px-12`}>
            <div className='flex justify-between items-center gap-2 w-max'>
                <div>
                    <Image
                        src={LogoImage}
                        alt='logo'
                        className='w-8'
                    />
                </div>
                <div className='text-xl font-bold'>Hive</div>
            </div>
            <div className='text-base font-medium flex justify-between gap-12 w-max items-center'>
                <div className='nav-item flex justify-center items-center w-max gap-2 cursor-pointer'>
                    <div className='nav-item-pointer w-[0.6rem] h-[0.6rem] bg-white rounded-full'></div>
                    Home
                </div>
                <div className='nav-item flex justify-center items-center w-max gap-2 cursor-pointer'>
                    <div className='nav-item-pointer w-[0.6rem] h-[0.6rem] bg-white rounded-full'></div>
                    Explore
                </div>
                <div className='nav-item flex justify-center items-center w-max gap-2 cursor-pointer'>
                    <div className='nav-item-pointer w-[0.6rem] h-[0.6rem] bg-white rounded-full'></div>
                    Contact Us
                </div>
            </div>
            <div className='text-base flex justify-between gap-6 w-max items-center'>
                <div className='p-2 px-4 border-[2px] border-gray-400 rounded-lg hover:text-white hover:bg-gray-400 cursor-pointer'>Login</div>
                <div className='p-2 px-4 bg-gray-500 text-white rounded-lg hover:opacity-65 cursor-pointer'>Get a Demo</div>
            </div>
        </div>
    )
}
"use client"

import { Quicksand } from 'next/font/google';
import { useRouter } from "next/navigation";
import Image from 'next/image';

const quicksand = Quicksand({ subsets: ['latin'] })

import LogoImage from '../images/hive_logo.png';

export default function Header() {
    const router = useRouter();
    const handleLogo = () => {
        router.push('/');
    }
    return(
        <div className={`${quicksand.className} flex justify-between items-center gap-2 w-max p-7 cursor-pointer`} onClick={handleLogo}>
            <div>
                <Image
                    src={LogoImage}
                    alt='logo'
                    className='w-10'
                />
            </div>
            <div className='text-xl font-bold'>Hive</div>
        </div>
    )
}
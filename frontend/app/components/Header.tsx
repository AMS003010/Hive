import { Quicksand } from 'next/font/google';
import Image from 'next/image';

const quicksand = Quicksand({ subsets: ['latin'] })

import LogoImage from '../images/hive_logo.png';

export default function Header() {
    return(
        <div className={`${quicksand.className} flex justify-between items-center gap-2 w-max p-7`}>
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
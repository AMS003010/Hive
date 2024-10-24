import { Quicksand } from 'next/font/google';
import Image from 'next/image';

import IeeeLogo from '../images/ieee.png';
import ShunyaLogo from '../images/shunya.png';
import DsgnrLogo from '../images/dsqnr.jpg';

const quicksand = Quicksand({ subsets: ['latin'] })

interface comProps {
    setSelected: React.Dispatch<React.SetStateAction<number>>
}

export default function FolderComp({setSelected}: comProps) {
    return(
        <div className={`folder ${quicksand.className} drop-shadow-xl shadow-xl`}>
            <div className='p-4 font-semibold'>
                Events
            </div>
            <div className='flex flex-col gap-1 px-4'>
                <div className='flex justify-start items-center gap-2 rounded-2xl shadow-md border border-gray-300 p-2 hover:bg-gray-200 cursor-pointer' onClick={() => setSelected(0)}>
                    <div className='border border-gray-300 rounded-lg p-1'>
                        <Image
                            src={IeeeLogo}
                            alt='ieee_logo'
                            className='w-[1.8rem]'
                        />
                    </div>
                    <div>
                        <div className='text-sm'>CodeFusion 2024</div>
                        <div className='text-xs text-gray-600'>IEEE PESIT</div>
                    </div>
                </div>
                <div className='flex justify-start items-center gap-2 rounded-2xl shadow-md border border-gray-300 p-2 hover:bg-gray-200 cursor-pointer' onClick={() => setSelected(1)}>
                    <div className='border border-gray-300 rounded-lg p-1 bg-black'>
                        <Image
                            src={ShunyaLogo}
                            alt='shunya_logo'
                            className='w-[1.8rem]'
                        />
                    </div>
                    <div>
                        <div className='text-sm'>Arithmenia 2024</div>
                        <div className='text-xs text-gray-600'>Shunya</div>
                    </div>
                </div>
                <div className='flex justify-start items-center gap-2 rounded-2xl shadow-md border border-gray-300 p-2 hover:bg-gray-200 cursor-pointer' onClick={() => setSelected(2)}>
                    <div className='border border-gray-300 rounded-lg p-1 bg-white'>
                        <Image
                            src={DsgnrLogo}
                            alt='DSGNR_logo'
                            className='w-[1.8rem]'
                        />
                    </div>
                    <div>
                        <div className='text-sm'>Jam 2024</div>
                        <div className='text-xs text-gray-600'>DSGNR</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
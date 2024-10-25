import { Quicksand } from 'next/font/google';

const quicksand = Quicksand({ subsets: ['latin'] })

interface comProps {
    selected: number
}

export default function FolderCompDown({selected}: comProps) {

    const selc = ["CodeFusion 2024","Arithmenia 2024","Jam 2024"]

    return(
        <div className={`folder ${quicksand.className} drop-shadow-xl shadow-xl`}>
            <div className='px-4 pt-3 font-semibold'>
                Manage
            </div>
            <div className='pl-4 py-3 text-gray-500 font-semibold text-sm'>
                {selc[selected]}
            </div>
            <div className='px-4'>
                <div className='grid grid-cols-3 gap-2'>
                    <div className='p-8 border border-gray-300 hover:border-gray-400 cursor-pointer w-max rounded-2xl'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-round-plus">
                            <path d="M2 21a8 8 0 0 1 13.292-6"/>
                            <circle cx="10" cy="8" r="5"/>
                            <path d="M19 16v6"/>
                            <path d="M22 19h-6"/>
                        </svg>
                    </div>
                    <div className='p-8 border border-gray-300 hover:border-gray-400 cursor-pointer w-max rounded-2xl'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-package-plus">
                            <path d="M16 16h6"/><path d="M19 13v6"/>
                            <path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14"/>
                            <path d="m7.5 4.27 9 5.15"/>
                            <polyline points="3.29 7 12 12 20.71 7"/>
                            <line x1="12" x2="12" y1="22" y2="12"/>
                        </svg>
                    </div>
                    <div className='p-8 border border-gray-300 hover:border-gray-400 cursor-pointer w-max rounded-2xl'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-list-plus">
                            <path d="M11 12H3"/>
                            <path d="M16 6H3"/>
                            <path d="M16 18H3"/>
                            <path d="M18 9v6"/>
                            <path d="M21 12h-6"/>
                        </svg>
                    </div>
                    <div className='p-8 border border-gray-300 hover:border-gray-400 cursor-pointer w-max rounded-2xl'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar-plus">
                            <path d="M8 2v4"/>
                            <path d="M16 2v4"/>
                            <path d="M21 13V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8"/>
                            <path d="M3 10h18"/>
                            <path d="M16 19h6"/>
                            <path d="M19 16v6"/>
                        </svg>
                    </div>
                    <div className='p-8 border border-gray-300 hover:border-gray-400 cursor-pointer w-max rounded-2xl'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus">
                            <path d="M5 12h14"/>
                            <path d="M12 5v14"/>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    )
}
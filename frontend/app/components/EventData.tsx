"use client";

import { Quicksand } from "next/font/google";
import { useRouter, useParams } from "next/navigation";

const quicksand = Quicksand({ subsets: ['latin'] });

export default function EventData() {
    const router = useRouter();
    const { eventName } = useParams();
    return(
        <div className="board-layout h-[31rem] border border-gray-200 mx-4 rounded-3xl overflow-hidden shadow-lg">
            <div className="flex justify-center items-center gap-2 w-max m-4">
                <div className="text-gray-500 font-extralight p-3 border rounded-xl w-max bg-gray-50 shadow-md text-center cursor-pointer hover:bg-gray-200" onClick={() => router.back()}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left size-6">
                        <path d="m12 19-7-7 7-7"/>
                        <path d="M19 12H5"/>
                    </svg>
                </div>
                <div className="text-xl text-gray-500 font-extralight p-2 px-6 border rounded-xl w-max bg-gray-50 shadow-md text-center">{eventName}</div>
            </div>
            <div className={`${quicksand.className} p-4 grid grid-cols-2 gap-2`}>
                <div className="flex flex-col items-center gap-8 p-10 border border-gray-300 rounded-3xl cursor-pointer hover:bg-gray-200">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-round-plus size-10 text-gray-600">
                            <path d="M2 21a8 8 0 0 1 13.292-6"/>
                            <circle cx="10" cy="8" r="5"/>
                            <path d="M19 16v6"/>
                            <path d="M22 19h-6"/>
                        </svg>
                    </div>
                    <div className="font-semibold">Add a Volunteer</div>
                </div>
                <div className="flex flex-col items-center gap-8 p-10 border border-gray-300 rounded-3xl cursor-pointer hover:bg-gray-200">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-hand-coins size-10 text-gray-600">
                            <path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17"/>
                            <path d="m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9"/>
                            <path d="m2 16 6 6"/>
                            <circle cx="16" cy="9" r="2.9"/>
                            <circle cx="6" cy="5" r="3"/>
                        </svg>
                    </div>
                    <div className="font-semibold">Add Budget</div>
                </div>
                <div className="flex flex-col items-center gap-8 p-10 border border-gray-300 rounded-3xl cursor-pointer hover:bg-gray-200">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users size-10 text-gray-600">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                            <circle cx="9" cy="7" r="4"/>
                            <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                        </svg>
                    </div>
                    <div className="font-semibold">Add a Organiser</div>
                </div>
                <div className="flex flex-col items-center gap-8 p-10 border border-gray-300 rounded-3xl cursor-pointer hover:bg-gray-200">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-notebook-pen size-10 text-gray-600">
                            <path d="M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4"/>
                            <path d="M2 6h4"/>
                            <path d="M2 10h4"/>
                            <path d="M2 14h4"/>
                            <path d="M2 18h4"/>
                            <path d="M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"/>
                        </svg>
                    </div>
                    <div className="font-semibold">Add a Task</div>
                </div>
            </div>
        </div>
    )
}
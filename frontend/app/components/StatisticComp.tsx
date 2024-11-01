"use client"

import { Inter, Quicksand } from "next/font/google";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ['latin'] });
const quicksand = Quicksand({ subsets: ['latin'] });

export default function StatisticComp() {
    const router = useRouter();

    const [dayDate, setDayDate] = useState<string>("");

    useEffect(() => {
        setDayDate(getFormattedDate());
    },[])

    const getFormattedDate = () => {
        const date = new Date();
        const options: Intl.DateTimeFormatOptions = { 
            weekday: 'long' as const, 
            day: 'numeric' as const, 
            month: 'long' as const, 
            year: 'numeric' as const 
        };
        return new Intl.DateTimeFormat('en-GB', options).format(date);
    };

    const handleFilter = () => {
        router.push('/dashboard/filter');
    }
    const handleCreate = () => {
        router.push('/dashboard/events');
    }
    const handleStat = () => {
        router.push('/dashboard/stats');
    }


    return (
        <div className="p-8">
            <div className={`${inter.className} text-5xl font-extralight`}>Hello, Beyonder</div>
            <div className="flex justify-between items-center py-1">
                <div className={`${quicksand.className} text-gray-600`}>It&apos;s {dayDate}</div>
                <div className="flex justify-center items-center w-max gap-2">
                    <div 
                        className="border p-2 px-4 rounded-xl cursor-pointer hover:bg-gray-200" 
                        onClick={handleFilter}
                    >
                        Filter
                    </div>
                    <div 
                        className="border p-2 px-4 rounded-xl cursor-pointer hover:bg-gray-200" 
                        onClick={handleCreate}
                    >
                        Manage events
                    </div>
                    <div 
                        className="border p-2 px-4 rounded-xl cursor-pointer hover:bg-gray-200"
                        onClick={handleStat}
                    >
                        Statistics
                    </div>
                </div>
            </div>
        </div>
    );
}

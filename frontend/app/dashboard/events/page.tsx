"use client"

import StatisticComp from "@/app/components/StatisticComp"
import Link from "next/link";
import { useEffect, useState } from "react"

export default function Create() {

    interface Events {
        id: number,
        name: string,
        description: string,
        start_date: string,
        end_date: string,
        location: string,
        created_by: string,
        by_club: string,
        vol_count: number,
        org_count: number,
        max_participants: number,
        curr_participants: number,
        budget: number,
        first_contact: string,
        sec_contact: string
    }

    const [events, setEvents] = useState<Events[] | null>(null);

    const grad = [
        ["#EEBD89","#D13ABD"],
        ["#9600FF","#AEBAF8"],
        ["#FBAB7E","#F7CE68"],
        ["#CCFBFF","#EF96C5"],
        ["#50D5B7","#067D68"],
        ["#FFE53B","#FF2525"],
        ["#ED765E","#E3BDE5"],
        ["#ED765E","#FEA858"],
        ["#BB73E0","#FF8DDB"]
    ]

    const gradColor = () => grad[Math.floor(Math.random() * grad.length)];

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/event', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });

            if (!response.ok) {
                console.log("Unable get events");
                return;
            }

            const data = await response.json();
            console.log(data)
            setEvents(data);
            console.log("Fetched events successfully");
        } catch (error) {
            console.error("Error fetching data:", error);
        }
        };

        fetchData();
    }, []);

    function formatDate(input: string) {
        const date = new Date(input);
    
        // Extract day, month, and year in the desired format
        const day = String(date.getUTCDate()).padStart(2, '0');
        const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-based
        const year = String(date.getUTCFullYear()).slice(-2); // Get last two digits of the year
    
        // Extract hours and minutes in the desired format
        const hours = String(date.getUTCHours()).padStart(2, '0');
        const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    
        // Return the formatted string
        return `${day}/${month}/${year} | ${hours}:${minutes}`;
    }

    return(
        <>
            <StatisticComp/>
            <div className="board-layout p-8 min-h-[31rem] h-max mb-8 border border-gray-200 mx-4 rounded-3xl overflow-hidden shadow-xl">
                <div className="text-4xl font-extralight">Events</div>
                

                <div className="flex flex-col">
                        {events ? (
                            events.map((event_ob: Events) => {
                                const color = gradColor()
                                return (
                                    <Link key={event_ob.id} href={`/dashboard/events/${event_ob.id}`}>
                                        <div key={event_ob.id} className="flex justify-start items-center gap-4 bg-white cursor-pointer rounded-2xl p-4 mt-4 shadow-md transform transition-transform hover:-translate-y-2 hover:shadow-lg">
                                            <div
                                                style={{
                                                    backgroundImage: `linear-gradient(to bottom right, ${color[0]}, ${color[1]})`
                                                }}
                                                className="w-[5rem] h-[5rem] rounded-xl"
                                            >
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <div className="text-2xl font-light">{event_ob.name}</div>
                                                <div className="flex justify-start items-center gap-2">
                                                    <span className='p-1.5 text-xs font-medium uppercase tracking-wider text-blue-80 bg-blue-200 rounded-lg bg-opacity-50'>{event_ob.by_club}</span>
                                                    <div className="flex justify-start items-center gap-2 p-1.5 text-xs font-medium uppercase tracking-wider text-orange-80 bg-orange-200 rounded-lg bg-opacity-50">
                                                        <div className="text-xs">{formatDate(event_ob.start_date)}</div>
                                                        <div>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-move-horizontal size-3">
                                                                <path d="m18 8 4 4-4 4"/>
                                                                <path d="M2 12h20"/>
                                                                <path d="m6 8-4 4 4 4"/>
                                                            </svg>
                                                        </div>
                                                        <div className="text-xs">{formatDate(event_ob.end_date)}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            })
                        ) : (
                            [...Array(3)].map((_, index) => (
                                <div key={index} className="flex justify-start items-center gap-4 bg-white hover:bg-gray-100 cursor-pointer rounded-2xl p-4 mt-4 shadow-md transform transition-transform hover:-translate-y-2 hover:shadow-lg">
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar size-20 text-gray-700">
                                            <path d="M8 2v4"/>
                                            <path d="M16 2v4"/>
                                            <rect width="18" height="18" x="3" y="4" rx="2"/>
                                            <path d="M3 10h18"/>
                                        </svg>
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <div className="w-[16rem] h-[1.8rem] bg-gray-200 rounded-md animate-pulse"></div>
                                        <div className="flex justify-start items-center gap-2">
                                            <div className="w-[4rem] h-[1rem] bg-gray-200 rounded-lg animate-pulse"></div>
                                            <div className="w-[12rem] h-[1rem] bg-gray-200 rounded-lg animate-pulse"></div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>


            </div>
        </>
    )
}
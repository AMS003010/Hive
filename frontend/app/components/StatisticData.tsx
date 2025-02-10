"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Quicksand } from "next/font/google";

import TotalEventPie from "./TotalEventPie"
import LogoImage from '../images/hive_logo.png';
import TotalBudgetBar from "./TotalBudgetBar";

const quicksand = Quicksand({ subsets: ['latin'] });

interface Item {
    id: string;
    label: string;
    value: number | null;
    color: string | null;
}

interface RespData {
    club_name: string,
    event_count: string
}

interface RespData2 {
    club_name: string,
    tot_budget: string
}

interface RespData3 {
    totalVolunteers: string,
    totalOrganizers: string,
    totalParticipants: string,
    totalBudget: string
}

interface BarItem {
    club: string;
    Expense: number;
}

const dataGraphNull = [
    {
      "id": "volunteer",
      "label": "volunteer",
      "value": 0,
      "color": "hsl(228, 70%, 50%)"
    },
    {
      "id": "organizer",
      "label": "organizer",
      "value": 0,
      "color": "hsl(85, 70%, 50%)"
    },
    {
      "id": "participant",
      "label": "participant",
      "value": 0,
      "color": "hsl(152, 70%, 50%)"
    }
]

export default function StatisticData() {
    const [volunteers, setVolunteers] = useState<number | null>(null);
    const [organizers, setOrganizers] = useState<number | null>(null);
    const [participants, setParticipants] = useState<number | null>(null);
    const [grossBudget, setGrossBudget] = useState<number | null>(null);
    const [graphData, setGraphData] = useState<Item[] | null>(null);
    const [graphBarData, setGraphBarData] = useState<BarItem[] | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://fellow-griselda-ams-org-8d17855c.koyeb.app/api/club/count', {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                });
    
                if (!response.ok) {
                    console.log("Unable to get events");
                    return;
                }
    
                const data = await response.json();
                console.log(data);
    
                // Set graph data in the required format
                setGraphData(
                    data.map((item: RespData) => ({
                        id: item.club_name,
                        label: item.club_name,
                        value: item.event_count,
                        color: null
                    }))
                );
    
                console.log("Fetched events successfully");
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        const fetchData2 = async () => {
            try {
                const response = await fetch('https://fellow-griselda-ams-org-8d17855c.koyeb.app/api/event/budget', {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                });
        
                if (!response.ok) {
                    console.log("Unable to get expenses");
                    return;
                }
        
                const data = await response.json();
                console.log(data);
        
                // Ensure data is an array
                if (Array.isArray(data) && data.length > 0) {
                    setGraphBarData(
                        data.map((item: RespData2) => ({
                            club: item.club_name,
                            Expense: Number(item.tot_budget),
                        }))
                    );
                } else {
                    setGraphBarData([]);
                }
        
                console.log("Fetched expenses successfully");
            } catch (error) {
                console.error("Error fetching expenses:", error);
            }
        }; 
        
        const fetchData3 = async () => {
            try {
                const response = await fetch('https://fellow-griselda-ams-org-8d17855c.koyeb.app/api/search', {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                });
        
                if (!response.ok) {
                    console.log("Unable to get dashboard stats");
                    return;
                }
        
                const data: RespData3 = await response.json();
                console.log(data);
        
                // Convert string values to numbers before setting state
                setVolunteers(Number(data.totalVolunteers));
                setOrganizers(Number(data.totalOrganizers));
                setParticipants(Number(data.totalParticipants));
                setGrossBudget(Number(data.totalBudget));
        
                console.log("Fetched dashboard stats successfully");
            } catch (error) {
                console.error("Error fetching dashboard stats:", error);
            }
        };
    
        fetchData();
        fetchData2();
        fetchData3();
    }, []);

    return(
        <div className={`${quicksand.className} board-layout p-4 min-h-[31rem] h-max mb-8 border border-gray-200 mx-4 rounded-3xl overflow-hidden shadow-xl`}>
            <div className="flex justify-between w-full gap-4">
                {graphData ? (
                    <div className="border rounded-xl bg-gray-50 shadow-md h-[19rem] w-[150rem] p-6">
                        <div className="text-xl">Count of events by clubs</div>
                        <TotalEventPie data={graphData ? graphData : dataGraphNull}/>
                    </div>
                ) : (
                    <div className="flex justify-center items-center p-4 border rounded-xl bg-gray-50 shadow-md h-[19rem] w-[150rem]">
                        <div className="w-full h-[92%] rounded-xl bg-gray-200 animate-pulse"></div>
                    </div>
                )}
                <div className="flex flex-col justify-between w-full">
                    <div className="flex flex-col gap-4 p-5 border rounded-xl w-full h-max bg-gray-50 shadow-md">
                        <div className="flex justify-between items-center">
                            <div className="text-2xl">Total Budget</div>
                            <div>
                                <div className="p-2 rounded-xl bg-gradient-to-br from-[#FFDEE9] to-[#B5FFFC]">
                                    <Image
                                        src={LogoImage}
                                        alt='logo'
                                        className='w-6'
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-start gap-4 items-center">
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-round size-6">
                                    <circle cx="12" cy="8" r="5"/>
                                    <path d="M20 21a8 8 0 0 0-16 0"/>
                                </svg>
                            </div>
                            {grossBudget ? (
                            <div className="text-4xl font-semibold">₹ {grossBudget}</div>
                            ) : (
                                <div className="w-[10rem] h-[2rem] rounded-md bg-gray-200 animate-pulse"></div>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 p-5 border rounded-xl w-full h-max bg-gray-50 shadow-md">
                        <div className="flex justify-between items-center">
                            <div className="text-2xl">Total participants</div>
                            <div>
                                <div className="p-2 rounded-xl bg-gradient-to-br from-[#FFDEE9] to-[#B5FFFC]">
                                    <Image
                                        src={LogoImage}
                                        alt='logo'
                                        className='w-6'
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-start gap-4 items-center">
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-round size-6">
                                    <circle cx="12" cy="8" r="5"/>
                                    <path d="M20 21a8 8 0 0 0-16 0"/>
                                </svg>
                            </div>
                            {participants ? (
                                <div className="text-4xl font-semibold">{participants}</div>
                            ) : (
                                <div className="w-[10rem] h-[2rem] rounded-md bg-gray-200 animate-pulse"></div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-between gap-3 my-3">
                <div className="flex flex-col gap-4 p-5 border rounded-xl w-full h-max bg-gray-50 shadow-md">
                    <div className="flex justify-between items-center">
                        <div className="text-2xl">Total Organisers</div>
                        <div>
                            <div className="p-2 rounded-xl bg-gradient-to-br from-[#FFDEE9] to-[#B5FFFC]">
                                <Image
                                    src={LogoImage}
                                    alt='logo'
                                    className='w-6'
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-start gap-4 items-center">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-round size-6">
                                <circle cx="12" cy="8" r="5"/>
                                <path d="M20 21a8 8 0 0 0-16 0"/>
                            </svg>
                        </div>
                        {organizers ? (
                            <div className="text-4xl font-semibold">{organizers}</div>
                        ) : (
                            <div className="w-[10rem] h-[2rem] rounded-md bg-gray-200 animate-pulse"></div>
                        )}
                    </div>
                </div>
                <div className="flex flex-col gap-4 p-5 border rounded-xl w-full h-max bg-gray-50 shadow-md">
                    <div className="flex justify-between items-center">
                        <div className="text-2xl">Total Volunteers</div>
                        <div>
                            <div className="p-2 rounded-xl bg-gradient-to-br from-[#FFDEE9] to-[#B5FFFC]">
                                <Image
                                    src={LogoImage}
                                    alt='logo'
                                    className='w-6'
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-start gap-4 items-center">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-round size-6">
                                <circle cx="12" cy="8" r="5"/>
                                <path d="M20 21a8 8 0 0 0-16 0"/>
                            </svg>
                        </div>
                        {volunteers ? (
                            <div className="text-4xl font-semibold">{volunteers}</div>
                        ) : (
                            <div className="w-[10rem] h-[2rem] rounded-md bg-gray-200 animate-pulse"></div>
                        )}
                    </div>
                </div>
            </div>
            {graphBarData ? (
                <div className="border rounded-xl bg-gray-50 shadow-md h-[30rem] w-full p-6">
                    <div className="text-xl">Expense of each club</div>
                    <TotalBudgetBar data={graphBarData || []} />
                </div>
            ) : (
                <div className="flex justify-center items-center p-2 border rounded-xl bg-gray-50 shadow-md h-[20rem]">
                    <div className="w-[98%] h-[92%] rounded-xl bg-gray-200 animate-pulse"></div>
                </div>
            )}
        </div>
    )
}
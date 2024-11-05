"use client";

import { Quicksand } from "next/font/google";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";

import LogoImage from '../../../images/hive_logo.png';
import TotalEventPie from "@/app/components/TotalEventPie";
import VolunteerList from "@/app/components/VolunteerList";
import OrganiserList from "@/app/components/OrganiserList";
import ParticipantList from "@/app/components/ParticipantList";
import UserList from "@/app/components/UserList";

const quicksand = Quicksand({ subsets: ['latin'] });

interface responseData {
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

interface GraphItem {
    id: string;
    label: string;
    value: number | null;
    color: string | null;
}

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
    return `${day}/${month}/${year} ${hours}:${minutes}`;
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

export default function EventData() {
    const router = useRouter();
    const { eventId } = useParams();
    const [date1, setDate1] = useState<string | null>(null);
    const [date2, setDate2] = useState<string | null>(null);
    const [time1, setTime1] = useState<string | null>(null);
    const [time2, setTime2] = useState<string | null>(null);
    const [graphData, setGraphData] = useState<GraphItem[] | null>(null);
    const [volunteers, setVolunteers] = useState<number | null>(null);
    const [organizers, setOrganizers] = useState<number | null>(null);
    const [participants, setParticipants] = useState<number | null>(null);
    const [color, setColor] = useState<string[] | null>(null);
    const [eventData, setEventData] = useState<responseData | null>(null);

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
        setColor(gradColor())
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/event/${eventId}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                });
    
                if (!response.ok) {
                    console.log("Unable get the event");
                    return;
                }
    
                const data = await response.json();
                console.log(data)
                setEventData(data)
                console.log("Fetched event successfully");
                setDate1(formatDate(data.start_date).split(' ')[0]);
                setDate2(formatDate(data.end_date).split(' ')[0]);
                setTime1(formatDate(data.start_date).split(' ')[1]); // Extract time from formatted date
                setTime2(formatDate(data.end_date).split(' ')[1]);   // Extract time from formatted date
                setParticipants(data.curr_participants);
                setOrganizers(data.org_count);
                setVolunteers(data.vol_count);
                setGraphData([
                    {
                        id: "volunteer",
                        label: "volunteer",
                        value: data.vol_count, // Use data directly
                        color: "hsl(228, 70%, 50%)"
                    },
                    {
                        id: "organizer",
                        label: "organizer",
                        value: data.org_count,
                        color: "hsl(85, 70%, 50%)"
                    },
                    {
                        id: "participant",
                        label: "participant",
                        value: data.curr_participants,
                        color: "hsl(152, 70%, 50%)"
                    }
                ]);

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
    
        fetchData();
    },[]) 

    return(
        <div className={`${quicksand.className} board-layout h-max border border-gray-200 mx-4 rounded-3xl overflow-hidden shadow-lg`}>
            <div className="flex justify-center items-center gap-2 w-max m-4 mb-8">
                <div className="text-gray-500 font-extralight p-3 border rounded-xl w-max bg-gray-50 shadow-md text-center cursor-pointer hover:bg-gray-200" onClick={() => router.back()}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left size-6">
                        <path d="m12 19-7-7 7-7"/>
                        <path d="M19 12H5"/>
                    </svg>
                </div>
                {
                    eventData ? (
                        <div className="text-xl text-gray-500 font-normal p-2 px-6 border rounded-xl w-max bg-gray-50 shadow-md text-center">{eventData?.name}</div>
                    ) : (
                        <div className="w-[9rem] h-[3rem] flex justify-center items-center border rounded-xl bg-gray-50 shadow-md">
                            <div className="w-[80%] h-[60%] rounded-lg bg-gray-200 animate-pulse"></div>
                        </div>
                    )
                }
            </div>
            <div className="flex justify-center items-center">
                <div
                    style={{
                        backgroundImage: `linear-gradient(to bottom right, ${color?.[0] || '#FFFFFF'}, ${color?.[1] || '#000000'})`
                    }}
                    className="relative w-[100%] h-[14rem] rounded-xl mx-8"
                >
                    <div className="absolute bottom-0 right-0 flex justify-center w-max items-end gap-2 p-3 rounded-xl bg-gray-50 m-4">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin size-5">
                                <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/>
                                <circle cx="12" cy="10" r="3"/>
                            </svg>
                        </div>
                        {eventData ? (
                            <div className="font-medium text-sm">{eventData?.location}</div>
                        ) : (
                            <div className="w-[8rem] h-[1.2rem] rounded-md bg-gray-200 animate-pulse"></div>
                        )}
                    </div>
                    <div className="absolute bottom-0 left-0 flex justify-center w-max items-end gap-2 p-3 rounded-xl bg-gray-50 m-4">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-traffic-cone size-5">
                                <path d="M9.3 6.2a4.55 4.55 0 0 0 5.4 0"/>
                                <path d="M7.9 10.7c.9.8 2.4 1.3 4.1 1.3s3.2-.5 4.1-1.3"/>
                                <path d="M13.9 3.5a1.93 1.93 0 0 0-3.8-.1l-3 10c-.1.2-.1.4-.1.6 0 1.7 2.2 3 5 3s5-1.3 5-3c0-.2 0-.4-.1-.5Z"/>
                                <path d="m7.5 12.2-4.7 2.7c-.5.3-.8.7-.8 1.1s.3.8.8 1.1l7.6 4.5c.9.5 2.1.5 3 0l7.6-4.5c.7-.3 1-.7 1-1.1s-.3-.8-.8-1.1l-4.7-2.8"/>
                            </svg>
                        </div>
                        {eventData ? (
                            <div className="font-medium text-sm">{eventData?.by_club}</div>
                        ) : (
                            <div className="w-[5rem] h-[1.2rem] rounded-md bg-gray-200 animate-pulse"></div>
                        )}
                    </div>
                </div>
            </div>
            <div className="flex justify-between gap-4 p-8">
                {eventData ? (
                    <div className="w-[70%] text-justify">{eventData?.description}</div>
                ) : (
                    <div className="flex flex-col gap-3">
                        <div className="w-[60rem] h-[1.2rem] rounded-md bg-gray-200 animate-pulse"></div>
                        <div className="w-[60rem] h-[1.2rem] rounded-md bg-gray-200 animate-pulse"></div>
                        <div className="w-[60rem] h-[1.2rem] rounded-md bg-gray-200 animate-pulse"></div>
                        <div className="w-[58rem] h-[1.2rem] rounded-md bg-gray-200 animate-pulse"></div>
                        <div className="w-[58rem] h-[1.2rem] rounded-md bg-gray-200 animate-pulse"></div>
                        <div className="w-[56rem] h-[1.2rem] rounded-md bg-gray-200 animate-pulse"></div>
                    </div>
                )}
                <div className="flex flex-col items-start gap-2">
                    <div className="flex justify-between p-4 border rounded-xl gap-12 h-max bg-gray-50 shadow-md">
                        <div className="flex flex-col gap-4">
                            <div className="flex justify-center w-max items-end gap-2">
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar size-5">
                                        <path d="M8 2v4"/><path d="M16 2v4"/>
                                        <rect width="18" height="18" x="3" y="4" rx="2"/>
                                        <path d="M3 10h18"/>
                                    </svg>
                                </div>
                                {eventData ? (
                                    <div className="font-medium text-sm">{date1}</div>
                                ) : (
                                    <div className="w-[5rem] h-[1.2rem] rounded-md bg-gray-200 animate-pulse"></div>
                                )}
                            </div>
                            <div className="flex justify-center w-max items-end gap-2">
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clock size-5">
                                        <circle cx="12" cy="12" r="10"/>
                                        <polyline points="12 6 12 12 16 14"/>
                                    </svg>
                                </div>
                                {eventData ? (
                                    <div className="font-medium text-sm">{time1}</div>
                                ) : (
                                    <div className="w-[5rem] h-[1.2rem] rounded-md bg-gray-200 animate-pulse"></div>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="flex justify-center w-max items-end gap-2">
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar size-5">
                                        <path d="M8 2v4"/><path d="M16 2v4"/>
                                        <rect width="18" height="18" x="3" y="4" rx="2"/>
                                        <path d="M3 10h18"/>
                                    </svg>
                                </div>
                                {eventData ? (
                                    <div className="font-medium text-sm">{date2}</div>
                                ) : (
                                    <div className="w-[5rem] h-[1.2rem] rounded-md bg-gray-200 animate-pulse"></div>
                                )}
                            </div>
                            <div className="flex justify-center w-max items-end gap-2">
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clock-9 size-5">
                                        <circle cx="12" cy="12" r="10"/>
                                        <polyline points="12 6 12 12 7.5 12"/>
                                    </svg>
                                </div>
                                {eventData ? (
                                    <div className="font-medium text-sm">{time2}</div>
                                ) : (
                                    <div className="w-[5rem] h-[1.2rem] rounded-md bg-gray-200 animate-pulse"></div>
                                )}
                            </div>
                        </div>
                    </div>
                    {eventData ? (
                        <div className="p-4 border rounded-xl w-full h-max bg-gray-50 shadow-md">
                            <div className="mb-3 font-semibold">For any queries, contact</div>
                            <div className="text-sm font-medium">{eventData?.first_contact.split('+')[0]}<span className="font-normal">+{eventData?.first_contact.split('+')[1]}</span></div>
                            <div className="text-sm font-medium">{eventData?.sec_contact.split('+')[0]}<span className="font-normal">+{eventData?.sec_contact.split('+')[1]}</span></div>
                        </div>
                    ) : (
                        <div className="p-4 border rounded-xl w-full h-max bg-gray-50 shadow-md">
                            <div className="mb-3 font-semibold">For any queries, contact</div>
                            <div className="w-[10rem] h-[1.2rem] mb-2 rounded-md bg-gray-200 animate-pulse"></div>
                            <div className="w-[10rem] h-[1.2rem] rounded-md bg-gray-200 animate-pulse"></div>
                        </div>
                    )}
                </div>
            </div>
            <div className="flex justify-around gap-2 w-full px-6">
                <div className="flex flex-col gap-4 p-5 border rounded-xl w-full h-max bg-gray-50 shadow-md">
                    <div className="flex justify-between items-center">
                        <div className="text-2xl">Volunteers</div>
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
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-round size-5">
                                <circle cx="12" cy="8" r="5"/>
                                <path d="M20 21a8 8 0 0 0-16 0"/>
                            </svg>
                        </div>
                        {eventData ? (
                            <div className="text-3xl font-semibold">{volunteers}</div>
                        ) : (
                            <div className="w-[10rem] h-[2rem] rounded-md bg-gray-200 animate-pulse"></div>
                        )}
                    </div>
                </div>
                <div className="flex flex-col gap-4 p-5 border rounded-xl w-full h-max bg-gray-50 shadow-md">
                    <div className="flex justify-between items-center">
                        <div className="text-2xl">Organisers</div>
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
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-round size-5">
                                <circle cx="12" cy="8" r="5"/>
                                <path d="M20 21a8 8 0 0 0-16 0"/>
                            </svg>
                        </div>
                        {eventData ? (
                            <div className="text-3xl font-semibold">{organizers}</div>
                        ) : (
                            <div className="w-[10rem] h-[2rem] rounded-md bg-gray-200 animate-pulse"></div>
                        )}
                    </div>
                </div>
                <div className="flex flex-col gap-4 p-5 border rounded-xl w-full h-max bg-gray-50 shadow-md">
                    <div className="flex justify-between items-center">
                        <div className="text-2xl">Participants</div>
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
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-round size-5">
                                <circle cx="12" cy="8" r="5"/>
                                <path d="M20 21a8 8 0 0 0-16 0"/>
                            </svg>
                        </div>
                        {eventData ? (
                            <div className="text-3xl font-semibold">{participants}/{eventData?.max_participants}</div>
                        ) : (
                            <div className="w-[10rem] h-[2rem] rounded-md bg-gray-200 animate-pulse"></div>
                        )}
                    </div>
                </div>
                <div className="flex flex-col gap-4 p-5 border rounded-xl w-full h-max bg-gray-50 shadow-md">
                    <div className="flex justify-between items-center">
                        <div className="text-2xl">Budget</div>
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
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-round size-5">
                                <circle cx="12" cy="8" r="5"/>
                                <path d="M20 21a8 8 0 0 0-16 0"/>
                            </svg>
                        </div>
                        {eventData ? (
                            <div className="text-3xl font-semibold">₹ {eventData?.budget}</div>
                        ) : (
                            <div className="w-[10rem] h-[2rem] rounded-md bg-gray-200 animate-pulse"></div>
                        )}
                    </div>
                </div>
            </div>
            {volunteers!=null && participants!=null && organizers!=null ? (
                <div className="mx-6 my-4 p-5 border rounded-xl bg-gray-50 shadow-md h-[20rem]">
                    <TotalEventPie data={graphData ? graphData : dataGraphNull}/>
                </div>
            ) : (
                <div className="flex justify-center items-center mx-6 my-4 p-2 border rounded-xl bg-gray-50 shadow-md h-[20rem]">
                    <div className="w-[98%] h-[92%] rounded-xl bg-gray-200 animate-pulse"></div>
                </div>
            )}
            <div>
                <VolunteerList event={eventData ? eventData?.name : "empty"}/>
            </div>
            <div>
                <OrganiserList event={eventData ? eventData?.name : "empty"}/>
            </div>
            <div>
                <ParticipantList event={eventData ? eventData?.name : "empty"}/>
            </div>
            <div>
                <UserList event={eventData ? eventData?.name : "empty"}/>
            </div>
        </div>
    )
}
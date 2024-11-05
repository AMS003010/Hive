import Image from "next/image";
import { useEffect, useState } from "react";
import NothingHere from '../images/nothing-here.png';

interface User {
    id: number,
    password: string,
    email: string,
    name: string
}

interface UserListProps {
    event: string;
}

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

export default function UserList({ event }: UserListProps) {
    const [users, setUsers] = useState<User[] | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/signup`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                });

                if (!response.ok) {
                    console.log("Unable to get users");
                    return;
                }

                const data = await response.json();
                console.log({ "now": data });
                setUsers(data);
                console.log("Fetched users successfully");

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const handleRoleChange = async (user: User, role: string) => {
        const endpoint = role === 'organiser' ? 'organiser' : 'volunteer';
        const url = `http://localhost:8000/api/${endpoint}`;
        const payload = {
            name: user.name,
            email: user.email,
            phno: "7498374",
            event: event
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                console.log(`${role} added successfully`);
            } else {
                console.log(`Failed to add ${role}`);
            }
        } catch (error) {
            console.error(`Error adding ${role}:`, error);
        }
    };

    return (
        <div className="board-layout p-8 h-[31rem] mb-8 border border-gray-200 mx-4 rounded-3xl overflow-hidden shadow-xl overflow-y-auto">
            <div className="text-4xl font-extralight">Users</div>
            <div className="flex flex-col">
                {users ? (
                    users.length !== 0 ? (
                        users.map((user) => {
                            const color = gradColor();
                            return (
                                <div key={user.id} className="flex justify-between items-center gap-4 bg-white cursor-pointer rounded-2xl p-4 mt-4 shadow-md transform transition-transform hover:-translate-y-2 hover:shadow-lg">
                                    <div className="flex justify-between items-center gap-4">
                                        <div
                                            style={{
                                                backgroundImage: `linear-gradient(to bottom right, ${color[0]}, ${color[1]})`
                                            }}
                                            className="w-[5rem] h-[5rem] rounded-xl"
                                        ></div>
                                        <div className="flex flex-col gap-1">
                                            <div className="text-2xl font-light">{user.name}</div>
                                            <div className="flex justify-start items-center gap-2">
                                                <span className='p-1.5 text-xs font-medium text-blue-80 bg-blue-200 rounded-lg bg-opacity-50'>{user.email}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="border rounded-lg p-2">
                                        <select
                                            onChange={(e) => handleRoleChange(user, e.target.value)}
                                            defaultValue=""
                                            className="p-2"
                                        >
                                            <option value="" disabled>Select an option</option>
                                            <option value="organiser">Organiser</option>
                                            <option value="volunteer">Volunteer</option>
                                        </select>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="flex flex-col justify-center items-center">
                            <div className="my-8">
                                <Image
                                    src={NothingHere}
                                    alt='logo'
                                    className='w-[15rem]'
                                />
                            </div>
                            <div className="text-2xl text-gray-600">Oops! Nothing here</div>
                        </div>
                    )
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
    );
}

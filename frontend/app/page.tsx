"use client"

import { Inter } from 'next/font/google';
import { useRouter } from "next/navigation";

const inter = Inter({ subsets: ['latin'] })

import LogoImage from './images/hive_logo.png';

import Image from "next/image";
import NavBar from "./components/Navbar";
import FolderComp from './components/FolderComp';
import FolderCompDown from './components/FolderCompDown';
import { useState } from 'react';

export default function Home() {
  
  const [selected, setSelected] = useState(0)
  const router = useRouter();
  const handleExplore = () => {
    router.push('/dashboard');
  }

  return (
    <div className="w-screen">
      <NavBar/>
      <div className="board-layout relative flex flex-col justify-center items-center h-[42rem] border border-gray-200 mx-4 rounded-3xl overflow-hidden shadow-xl">
        <div>
          <div className="rounded-3xl bg-gradient-to-br from-[#fcfcfc] to-gray-300 shadow-[18px_18px_18px_3px_rgba(204,204,204,1)]">
            <Image
              src={LogoImage}
              alt="logo"
              className="w-[6rem] p-6"
            />
          </div>
        </div>
        <div className={`flex flex-col  justify-center items-center text-center ${inter.className} mt-8 gap-4`}>
          <div className='text-6xl font-medium'>Think, plan and track</div>
          <div className='text-5xl text-[#a3a3a3] font-medium'>all in one place</div>
          <div className='text-sm font-extralight'>Efficiently manage your events without any extra effort</div>
          <div className='p-2 px-4 bg-gray-500 text-white rounded-lg hover:opacity-65 cursor-pointer w-max mt-8' onClick={handleExplore}>Explore events</div>
        </div>
        <div className='absolute top-28 -right-20 rotate-12'>
          <FolderComp setSelected={setSelected}/>
        </div>
        <div className='absolute -bottom-10 left-20 -rotate-6'>
          <FolderCompDown selected={selected}/>
        </div>
      </div>
    </div>
  );
}
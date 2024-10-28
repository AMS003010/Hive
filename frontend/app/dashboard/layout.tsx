import type { Metadata } from "next";
import Header from "../components/Header";
import Image from "next/image";

import AvatarImg from '../images/avatar.png';

export const metadata: Metadata = {
  title: "Dashboard - Hive",
  description: "Dashboard for managing events on the Hive platform",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <div className="flex items-center justify-between mr-10">
          <Header/>
          <div className="w-max flex items-center justify-center">
            <Image
              src={AvatarImg}
              alt="avatar"
              className="w-12 rounded-full bg-center bg-no-repeat bg-cover"
            />
          </div>
        </div>
        <main>
            {children}
        </main>
      </body>
    </html>
  );
}
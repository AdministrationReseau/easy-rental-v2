'use client'

import AgencyNavbar from "@/components/navbar/AgencyNavbar";
import AgencySidebar from "@/components/sidebar/AgencySidebar";
import React from "react";

export default function Layout({children }: { children: React.ReactNode }) {
    return (
        <div className="bg-background-light dark:bg-background-dark">
          <AgencyNavbar/>
          <AgencySidebar />
          <main className="md:ml-64 pt-[60px] pb-[70px] md:pb-0">
            <div className="p-6">
              {children}
            </div>
          </main>
        </div>
    )
}

'use client'

import React from "react";
import OrganizationNavbar from "@/components/navbar/OrganizationNavbar";
import OrganizationSidebar from "@/components/sidebar/OrganizationSidebar";

export default function Layout({children }: { children: React.ReactNode }) {
    return (
        <div className="bg-background-light dark:bg-background-dark">
          <OrganizationNavbar/>
          <OrganizationSidebar/>
          <main className="md:ml-64 pt-16 pb-12 md:pb-0">
            <div className="p-6">
              {children}
            </div>
          </main>
        </div>
    )
}

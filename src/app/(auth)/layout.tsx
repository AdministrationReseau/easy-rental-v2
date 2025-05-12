'use client'

import ClientNavbar from "@/components/navbar/ClientNavbar";

export default function Layout({children }: { children: React.ReactNode }) {
    return (
        <>
          <ClientNavbar/>
            <main>
                {children}
            </main>
        </>
    )
}

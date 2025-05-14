'use client'

import ClientNavbar from "@/components/navbar/ClientNavbar";

export default function Layout({children }: { children: React.ReactNode }) {
    return (
        <>
          <ClientNavbar/>
            <main className="mt-16">
                {children}
            </main>
        </>
    )
}

"use client";

import React from 'react';
import ClientNavbar from "@/components/navbar/ClientNavbar";

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark dark:text-text-dark">
            <ClientNavbar/>

            <div className="pt-[80px]">
            </div>
        </div>
    );
}

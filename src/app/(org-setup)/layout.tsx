'use client'


import GuestNavbar from "@/components/navbar/GuestNavbar";

export default function Layout({children }: { children: React.ReactNode }) {
	return (
		<>
			<GuestNavbar/>
			<main className="pt-16">
				{children}
			</main>
		</>
	)
}

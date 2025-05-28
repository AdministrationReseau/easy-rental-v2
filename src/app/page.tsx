"use client";

import React from 'react';
import GuestNavbar from "@/components/navbar/GuestNavbar";
import Hero from "@/components/landing/Hero";
// import HowItWorks from "@/components/landing/HowItWorks";
// import Services from "@/components/landing/Services";
// import Earning from "@/components/landing/Earning";
// import Organisation from "@/components/landing/Organisation";
import Partners from "@/components/landing/Partners";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/footer/footer";
// import Feature from "@/components/landing/Feature";
// import ServicesSection from "@/components/landing/ServicesSection";
import Statistics from "@/components/landing/Statistics";
import Team from "@/components/landing/Team";

export default function Home() {

	return (
		<div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark">
			<GuestNavbar/>
			<Hero/>

			{/*<HowItWorks/>*/}
			{/*<Services/>*/}
			{/*<Earning/>*/}
			{/*<Feature/>*/}
			{/*<Organisation/>*/}

			<Statistics/>
			<Team/>
			<Partners/>

			{/*<ServicesSection/>*/}

			<CTA/>
			<Footer/>
		</div>
	);
}

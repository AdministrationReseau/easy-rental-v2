"use client";

import React from 'react';
import GuestNavbar from "@/components/navbar/GuestNavbar";
import Hero from "@/components/landing/Hero";
import Feature from "@/components/landing/Feature";
import HowItWorks from "@/components/landing/HowItWorks";
import ServicesSection from "@/components/landing/ServicesSection";
import Organisation from "@/components/landing/Organisation";
import Earning from "@/components/landing/Earning";
import Statistics from "@/components/landing/Statistics";
import Partners from "@/components/landing/Partners";
import Team from "@/components/landing/Team";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/footer/footer";

export default function Home() {
	return (
		<div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark">
			<GuestNavbar/>
			<Hero/>
			<HowItWorks/>
			<ServicesSection/>
			<Feature/>
			<Earning/>
			<Organisation/>
			<Statistics/>
			<Partners/>
			<Team/>
			<CTA/>
			<Footer/>
		</div>
	);
}
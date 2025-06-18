"use client";

import React from 'react';
import dynamic from 'next/dynamic';

import GuestNavbar from "@/components/navbar/GuestNavbar";
import Hero from "@/components/landing/Hero";
import Loader from "@/components/ui/loader";
const Feature = dynamic(() => import('@/components/landing/Feature'), { loading: () => <div> <Loader/></div>});
const HowItWorks = dynamic(() => import('@/components/landing/HowItWorks'), { loading: () => <div> <Loader/></div>});
const Services = dynamic(() => import('@/components/landing/Services'), { loading: () => <div> <Loader/></div>});
const Organisation = dynamic(() => import('@/components/landing/Organisation'), { loading: () => <div> <Loader/></div>});
const Earning = dynamic(() => import('@/components/landing/Earning'), { loading: () => <div> <Loader/></div>});
const Statistics = dynamic(() => import('@/components/landing/Statistics'), { loading: () => <div> <Loader/></div>});
const Partners = dynamic(() => import('@/components/landing/Partners'), { loading: () => <div> <Loader/></div>});
const Team = dynamic(() => import('@/components/landing/Team'), { loading: () => <div> <Loader/></div>});
const CTA = dynamic(() => import('@/components/landing/CTA'), { loading: () => <div> <Loader/></div>});
const Footer = dynamic(() => import('@/components/footer/footer'), { loading: () => <div> <Loader/></div>});

export default function Home() {
	return (
		<div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark">
			<GuestNavbar/>
			<Hero/>
			<HowItWorks/>
			<Services/>
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
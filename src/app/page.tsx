"use client";

import React from 'react';
import GuestNavbar from "@/components/navbar/GuestNavbar";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import Services from "@/components/landing/Services";
import Earning from "@/components/landing/Earning";
import Organisation from "@/components/landing/Organisation";
import Team from "@/components/landing/Team";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/footer/footer";
import Statistics from "@/components/landing/Statistics";
import Feature from "@/components/landing/Feature";
import ServicesSection from "@/components/landing/ServicesSection";

export default function Home() {

  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark">
      <GuestNavbar/>
      <Hero/>
      <Feature/>
      <ServicesSection/>
      <HowItWorks/>
      <Services/>
      <Earning/>
      <Organisation/>
      <Statistics/>
      <Team/>
      <CTA/>
      <Footer/>
    </div>
  );
}

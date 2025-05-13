import GuestNavbar from "@/components/navbar/GuestNavbar";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import Services from "@/components/landing/Services";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col text-text-light dark:text-text-dark dark:bg-background-dark">
      <GuestNavbar/>
      <Hero/>
      <HowItWorks/>
      <Services/>

      Hello

    </div>
  );
}

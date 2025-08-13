'use client'
import CallToActionSection from "@/components/CallToAction";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import StatsSection from "@/components/StatsSection";
import TestimonialsSection from "@/components/Testimonials";
import { useAuth } from "@/context/AuthProvider";

export default function Home() {
  const { user, loading } = useAuth();
  console.log(user);

  return (
    <div className="h-[100dvh] flex flex-col bg-white dark:bg-gray-900 transition-colors duration-300">
      <Navbar />
      <main
        className="
          flex-1 overflow-y-auto 
        bg-white dark:bg-gray-950
          transition-colors duration-300
        "
      >
        <Hero />
        <Features />
        <TestimonialsSection />
        <CallToActionSection />
        <StatsSection />
        <Footer />
      </main>
    </div>
  );
}

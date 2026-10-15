"use client";

import React from "react";
import HeroSequence from "@/components/HeroSequence";
import CarOverview from "@/components/CarOverview";
import EngineSection from "@/components/EngineSection";
import AeroSection from "@/components/AeroSection";
import CockpitSection from "@/components/CockpitSection";
import TechSpecs from "@/components/TechSpecs";
import ClosingHero from "@/components/ClosingHero";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-slate-100 selection:bg-[#0066b1] selection:text-white">
      {/* 1. Cinematic Scroll-Controlled Image Sequence Hero */}
      <HeroSequence />

      {/* 2. Car Overview */}
      <CarOverview />

      {/* 3. Engine & Powertrain */}
      <EngineSection />

      {/* 4. Aerodynamics & Chassis */}
      <AeroSection />

      {/* 5. Cockpit & Driver Ergonomics */}
      <CockpitSection />

      {/* 6. Technical Specifications */}
      <TechSpecs />

      {/* 7. Closing Hero & Race Team Inquiries */}
      <ClosingHero />
    </main>
  );
}

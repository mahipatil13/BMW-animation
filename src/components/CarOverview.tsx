"use client";

import React from "react";

export default function CarOverview() {
  const technicalPillars = [
    {
      category: "Platform Architecture",
      title: "Chassis & Roll Cage Construction",
      description:
        "Built on the BMW Group Dingolfing production line using an adapted high-tensile steel frame with an integrated FIA 8862-2009 certified safety roll cage. Removable carbon fiber exterior bodywork provides fast corner-repair capability during endurance pitstops.",
    },
    {
      category: "Drivetrain Integration",
      title: "P58 3.0L TwinPower Turbo Inline-Six",
      description:
        "The motorsport-derived P58 engine delivers up to 590 horsepower and over 700 Nm of torque. Dry-sump lubrication allows a significantly lower installation height, reducing the center of gravity compared to the previous V8-powered M6 GT3.",
    },
    {
      category: "Aerodynamic Efficiency",
      title: "CFD & Wind Tunnel Development",
      description:
        "Engineered with a focus on aerodynamic stability across varied yaw angles. The combination of a top-mount swan-neck rear wing, full-length underfloor diffuser, and front carbon dive planes provides predictable downforce balance on high-speed sweeps.",
    },
    {
      category: "Endurance Usability",
      title: "Cockpit Climate & Driver Ergonomics",
      description:
        "Equipped with standard high-capacity air conditioning to mitigate cockpit heat exhaustion during 24-hour endurance stints. A sliding pedal box and adjustable steering column accommodate drivers of different heights without altering seat mounting geometry.",
    },
  ];

  return (
    <section id="overview" className="scroll-mt-24 py-24 bg-black text-slate-100 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-semibold tracking-wider uppercase text-[#0066b1] block mb-2">
            Vehicle Overview
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
            BMW M4 GT3 Customer Racing Platform
          </h2>
          <p className="mt-4 text-base text-zinc-300 leading-relaxed">
            The BMW M4 GT3 serves as BMW M Motorsport’s flagship race car for customer teams competing in
            international GT3 championships, including the IMSA WeatherTech SportsCar Championship, Fanatec
            GT World Challenge, DTM, and the 24-hour races at the Nürburgring and Spa-Francorchamps.
          </p>
        </div>

        {/* Technical Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {technicalPillars.map((pillar, idx) => (
            <div
              key={idx}
              className="car-panel p-8 rounded-md border border-zinc-800 hover:border-zinc-700 transition-colors"
            >
              <span className="text-xs font-mono uppercase text-[#0066b1] tracking-wider block mb-2 font-medium">
                {pillar.category}
              </span>
              <h3 className="text-xl font-bold text-white mb-3">
                {pillar.title}
              </h3>
              <p className="text-sm text-zinc-300 leading-relaxed font-normal">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>

        {/* Technical Comparison Note */}
        <div className="mt-12 p-6 rounded-md bg-zinc-950 border border-zinc-800 text-sm text-zinc-300 leading-relaxed">
          <strong className="text-white font-semibold">Development Objective:</strong> The M4 GT3 was engineered
          to deliver significantly longer component lifecycles for transmission and engine parts compared to its
          predecessor, drastically reducing running costs per racing kilometer while ensuring benign handling
          characteristics for both professional works drivers and gentleman racers.
        </div>
      </div>
    </section>
  );
}

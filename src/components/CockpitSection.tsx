"use client";

import React, { useState } from "react";

export default function CockpitSection() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const systems = [
    {
      id: "steering-wheel",
      title: "Fanatec Carbon Steering Wheel",
      badge: "Competition & Sim Compatible",
      description:
        "Developed collaboratively between BMW Motorsport and Fanatec. Constructed from autoclaved carbon composite, this is the first motorsport steering wheel that can be unclipped from the real GT3 race car and mounted directly onto a PC racing simulator wheelbase with zero adapters.",
      highlights: [
        "12 backlit pushbuttons with customizable RGB tactile feedback",
        "Two 12-position rotary switches and two thumb encoders for in-flight adjustments",
        "Magnetic carbon paddle shifters and dual hall-sensor clutch bite-point paddles",
      ],
    },
    {
      id: "digital-display",
      title: "Bosch DDU10 Digital Display",
      badge: "High-Contrast Race Dash",
      description:
        "A full-color, anti-glare display mounted directly behind the steering wheel in the driver's direct field of view. Features progressive rev-indicator LEDs and programmable display pages tailored for sprint qualifying versus multi-hour endurance night stints.",
      highlights: [
        "Real-time lap time delta calculation based on GPS and wheel speed sensors",
        "Individual four-wheel tire pressure and carcass temperature monitoring",
        "Fuel consumption projection with automated pitstop lap calculator",
      ],
    },
    {
      id: "driver-controls",
      title: "Center Console Dynamic Controls",
      badge: "Tactile In-Car Adjustments",
      description:
        "The angled center console provides immediate access to core chassis and engine electronics. Rotary selectors allow instant calibration adjustments without taking attention away from the racing line.",
      highlights: [
        "12-stage Bosch Motorsport ABS calibration dial",
        "12-stage traction control (TC) slip and cut angle controller",
        "Mechanical front-to-rear brake bias adjuster with digital percentage readout",
      ],
    },
    {
      id: "safety-cell",
      title: "FIA 8862-2009 Safety Cell",
      badge: "Safety Homologation",
      description:
        "The carbon race seat is bolted rigidly into the steel roll cage to form an immovable survival cell. To accommodate drivers of different heights during endurance driver changes, the pedal assembly and steering column slide longitudinally.",
      highlights: [
        "Compliant with the highest FIA 8862-2009 crash resistance standards",
        "Emergency roof rescue hatch for rapid medical extrication",
        "Standard high-capacity cabin air conditioning system",
      ],
    },
  ];

  return (
    <section id="cockpit" className="scroll-mt-24 py-24 bg-zinc-950 text-slate-100 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-semibold tracking-wider uppercase text-[#0066b1] block mb-2">
            Cockpit Systems
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
            Driver Ergonomics & Electronic Controls
          </h2>
          <p className="mt-4 text-base text-zinc-300 leading-relaxed">
            The BMW M4 GT3 interior is optimized for driver stamina and intuitive operation during
            multi-driver endurance competitions, featuring unified controls co-developed with sim racing hardware.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8" role="tablist" aria-label="Cockpit Features">
          {systems.map((item, idx) => (
            <button
              key={item.id}
              role="tab"
              id={`cockpit-tab-${item.id}`}
              aria-selected={activeTab === idx}
              aria-controls={`cockpit-panel-${item.id}`}
              onClick={() => setActiveTab(idx)}
              className={`p-4 rounded border text-left transition-colors cursor-pointer ${
                activeTab === idx
                  ? "car-panel-active bg-zinc-900 border-[#0066b1]"
                  : "car-panel border-zinc-800 hover:border-zinc-700 bg-black/60"
              }`}
            >
              <span className="text-xs font-mono text-[#0066b1] block mb-1">
                SYSTEM 0{idx + 1}
              </span>
              <span className="text-sm font-bold text-white block">
                {item.title}
              </span>
            </button>
          ))}
        </div>

        {/* Detailed Panel */}
        <div
          className="car-panel p-8 rounded border border-zinc-800"
          role="tabpanel"
          id={`cockpit-panel-${systems[activeTab].id}`}
          aria-labelledby={`cockpit-tab-${systems[activeTab].id}`}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 mb-6 border-b border-zinc-800 gap-2">
            <div>
              <span className="text-xs font-mono text-[#0066b1] uppercase block mb-1">
                {systems[activeTab].badge}
              </span>
              <h3 className="text-2xl font-bold text-white">
                {systems[activeTab].title}
              </h3>
            </div>
            <span className="text-xs text-zinc-400 bg-zinc-900 px-3 py-1 rounded border border-zinc-800 self-start md:self-auto font-mono">
              FIA HOMOLOGATED
            </span>
          </div>

          <p className="text-sm text-zinc-300 leading-relaxed mb-8 max-w-4xl">
            {systems[activeTab].description}
          </p>

          <div className="space-y-3">
            <span className="text-xs font-semibold text-white uppercase tracking-wider block mb-2">
              System Specifications:
            </span>
            {systems[activeTab].highlights.map((point, i) => (
              <div key={i} className="flex items-start gap-2.5 text-xs text-zinc-300">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0066b1] mt-1.5 shrink-0" />
                <span>{point}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

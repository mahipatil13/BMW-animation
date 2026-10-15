"use client";

import React, { useState } from "react";

export default function EngineSection() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const engineComponents = [
    {
      id: "dry-sump",
      title: "Dry-Sump Lubrication System",
      specification: "5-Stage Suction Pumps",
      description:
        "The P58 engine features a dedicated motorsport dry-sump oil pan with 5 suction stages to ensure consistent oil pressure during sustained lateral accelerations exceeding 2.5G. This setup also allows the engine to be mounted 40 mm lower in the chassis.",
    },
    {
      id: "turbos",
      title: "Twin Mono-Scroll Turbochargers",
      specification: "Electronic Wastegate Regulation",
      description:
        "Engineered for immediate throttle response out of low-speed apexes. Two bespoke mono-scroll turbochargers operate under strict Balance of Performance (BoP) manifold pressure tables governed directly by the FIA scrutineering data logger.",
    },
    {
      id: "cylinder-head",
      title: "3D-Printed Cylinder Head Core",
      specification: "Additive Metal Manufacturing",
      description:
        "The cylinder head water jacket is produced using 3D metal printing. This allows geometric routing of coolant passages around the combustion chambers that are physically impossible to cast, ensuring uniform thermal management across 24-hour races.",
    },
    {
      id: "crankshaft",
      title: "Forged Torsionally Rigid Crankshaft",
      specification: "Hardened Chrome-Moly Forging",
      description:
        "A lightweight, counterweight-optimized forged crankshaft reduces rotating mass and inertia, providing rapid engine revving response up to the 7,200 RPM homologated redline while maintaining exceptional torsional fatigue resistance.",
    },
  ];

  return (
    <section id="engine" className="scroll-mt-12 py-24 bg-zinc-950 text-slate-100 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-semibold tracking-wider uppercase text-[#0066b1] block mb-2">
            Powertrain Engineering
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
            BMW P58 3.0-Litre Inline-Six
          </h2>
          <p className="mt-4 text-base text-zinc-300 leading-relaxed">
            Derived from the production S58 engine of the road-going M4, the competition-spec P58 was
            re-engineered for continuous endurance racing conditions, offering linear throttle modulation
            and wide torque delivery.
          </p>
        </div>

        {/* Engine Components Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Tab Selection */}
          <div className="lg:col-span-5 flex flex-col gap-3" role="tablist" aria-label="Engine Components">
            {engineComponents.map((item, idx) => (
              <button
                key={item.id}
                role="tab"
                id={`tab-${item.id}`}
                aria-selected={activeTab === idx}
                aria-controls={`panel-${item.id}`}
                onClick={() => setActiveTab(idx)}
                className={`text-left p-5 rounded border transition-colors cursor-pointer ${
                  activeTab === idx
                    ? "car-panel-active bg-zinc-900 border-[#0066b1]"
                    : "car-panel border-zinc-800 hover:border-zinc-700 bg-black/60"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-white text-base">
                    {item.title}
                  </span>
                  <span className="text-xs font-mono text-[#0066b1] bg-blue-950/40 px-2 py-0.5 rounded border border-blue-900/50">
                    {item.specification}
                  </span>
                </div>
                <p className="text-xs text-zinc-400 line-clamp-2">
                  {item.description}
                </p>
              </button>
            ))}
          </div>

          {/* Detailed Component Panel & Dyno Chart */}
          <div
            className="lg:col-span-7 car-panel p-8 rounded border border-zinc-800"
            role="tabpanel"
            id={`panel-${engineComponents[activeTab].id}`}
            aria-labelledby={`tab-${engineComponents[activeTab].id}`}
          >
            <div className="pb-4 mb-6 border-b border-zinc-800">
              <span className="text-xs font-mono text-[#0066b1] uppercase block mb-1">
                Component Breakdown
              </span>
              <h3 className="text-2xl font-bold text-white">
                {engineComponents[activeTab].title}
              </h3>
            </div>

            <p className="text-sm text-zinc-300 leading-relaxed mb-8">
              {engineComponents[activeTab].description}
            </p>

            {/* Dyno Graph */}
            <div className="bg-black p-5 rounded border border-zinc-800">
              <div className="flex items-center justify-between mb-3 text-xs font-mono">
                <span className="text-zinc-300">Dyno Power Band Output</span>
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5 text-[#0066b1]">
                    <span className="w-3 h-0.5 bg-[#0066b1]" /> Power (HP)
                  </span>
                  <span className="flex items-center gap-1.5 text-[#e00000]">
                    <span className="w-3 h-0.5 bg-[#e00000]" /> Torque (Nm)
                  </span>
                </div>
              </div>

              {/* SVG Dyno Curve */}
              <div className="h-40 w-full relative">
                <svg className="w-full h-full" viewBox="0 0 500 160" preserveAspectRatio="none">
                  {[30, 70, 110, 150].map((y, i) => (
                    <line key={i} x1="0" y1={y} x2="500" y2={y} stroke="#27272a" strokeDasharray="3 3" />
                  ))}

                  {/* Power Curve */}
                  <path
                    d="M 20,140 Q 140,110 260,65 T 460,25"
                    fill="none"
                    stroke="#0066b1"
                    strokeWidth="3"
                  />

                  {/* Torque Curve */}
                  <path
                    d="M 20,115 Q 90,40 200,35 T 360,35 Q 410,45 460,75"
                    fill="none"
                    stroke="#e00000"
                    strokeWidth="3"
                  />
                </svg>

                <div className="absolute top-2 right-4 text-xs font-mono text-[#0066b1] font-semibold">
                  590 HP @ 7,000 RPM
                </div>
                <div className="absolute top-10 left-1/3 text-xs font-mono text-[#e00000] font-semibold">
                  &gt;700 Nm (3,000 - 5,500 RPM)
                </div>
              </div>

              <div className="flex justify-between text-[11px] font-mono text-zinc-400 pt-2 border-t border-zinc-800">
                <span>2,000 RPM</span>
                <span>3,500 RPM</span>
                <span>5,000 RPM</span>
                <span>6,500 RPM</span>
                <span>7,200 RPM</span>
              </div>
            </div>

            {/* Quick Engine Specifications */}
            <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-zinc-800 text-center">
              <div>
                <span className="text-xs text-zinc-400 block">Valvetrain</span>
                <span className="text-sm font-semibold text-white mt-1 block">4 Valves/Cylinder</span>
              </div>
              <div>
                <span className="text-xs text-zinc-400 block">Engine ECU</span>
                <span className="text-sm font-semibold text-white mt-1 block">Bosch MS6.4</span>
              </div>
              <div>
                <span className="text-xs text-zinc-400 block">Redline</span>
                <span className="text-sm font-semibold text-white mt-1 block">7,200 RPM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import React, { useState } from "react";

export default function TechSpecs() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Specifications" },
    { id: "engine", label: "Engine & Drivetrain" },
    { id: "chassis", label: "Chassis & Suspension" },
    { id: "brakes", label: "Braking System" },
    { id: "dimensions", label: "Dimensions & Capacities" },
  ];

  const specifications = [
    // Engine & Drivetrain
    { category: "engine", system: "Engine Type", value: "BMW P58 3.0L M TwinPower Turbo Inline-6", detail: "24-valve DOHC, dry-sump lubrication" },
    { category: "engine", system: "Displacement", value: "2,993 cc", detail: "Bore 84.0 mm x Stroke 90.0 mm" },
    { category: "engine", system: "Max Power Output", value: "Up to 590 HP", detail: "Determined by championship Balance of Performance" },
    { category: "engine", system: "Max Torque", value: "Over 700 Nm", detail: "Wide plateau from 3,000 to 5,500 RPM" },
    { category: "engine", system: "Transmission", value: "Xtrac 6-Speed Sequential Gearbox", detail: "Pneumatically actuated steering wheel paddle shift" },
    { category: "engine", system: "Clutch Mechanism", value: "Electro-Hydraulic Competition Clutch", detail: "Hand-paddle launch control, no foot clutch pedal" },
    { category: "engine", system: "Differential", value: "Mechanical Limited-Slip Differential", detail: "Adjustable ramp angles and multi-plate preloading" },

    // Chassis & Suspension
    { category: "chassis", system: "Front Suspension", value: "Double Wishbone Architecture", detail: "4-way adjustable KW competition dampers" },
    { category: "chassis", system: "Rear Suspension", value: "Multi-Link Axle Assembly", detail: "4-way adjustable KW competition dampers" },
    { category: "chassis", system: "Anti-Roll Bars", value: "Quick-Adjust Front and Rear Bars", detail: "Accessible cockpit or paddock tuning linkages" },
    { category: "chassis", system: "Safety Structure", value: "Welded High-Tensile Roll Cage", detail: "FIA 8862-2009 certified safety cell" },

    // Brakes
    { category: "brakes", system: "Front Brake Calipers", value: "6-Piston AP Racing Monobloc", detail: "Ventilated 390 mm steel brake discs" },
    { category: "brakes", system: "Rear Brake Calipers", value: "4-Piston AP Racing Monobloc", detail: "Ventilated 370 mm steel brake discs" },
    { category: "brakes", system: "ABS Control", value: "Bosch Motorsport M5 ABS", detail: "12 selectable calibration settings on center console" },

    // Dimensions
    { category: "dimensions", system: "Overall Length", value: "5,020 mm", detail: "Including aerodynamic front splitter and rear wing" },
    { category: "dimensions", system: "Overall Width", value: "2,040 mm", detail: "Widebody competition carbon fenders" },
    { category: "dimensions", system: "Wheelbase", value: "2,917 mm", detail: "Long wheelbase tuned for high-speed aero stability" },
    { category: "dimensions", system: "Homologated Dry Weight", value: "Approx. 1,300 kg", detail: "Subject to FIA Balance of Performance ballast" },
    { category: "dimensions", system: "Fuel Cell Capacity", value: "120 Litres FT3 Safety Tank", detail: "Dual dry-break high-speed refueling valves" },
    { category: "dimensions", system: "Wheel Dimensions", value: "12.5 x 18\" (Front) / 13.0 x 18\" (Rear)", detail: "One-piece forged aluminum with center-lock nuts" },
  ];

  const filteredSpecs = activeCategory === "all"
    ? specifications
    : specifications.filter((s) => s.category === activeCategory);

  return (
    <section id="specs" className="scroll-mt-24 py-24 bg-black text-slate-100 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-semibold tracking-wider uppercase text-[#0066b1] block mb-2">
            Technical Matrix
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
            FIA GT3 Homologation Specifications
          </h2>
          <p className="mt-4 text-base text-zinc-300 leading-relaxed">
            Verified technical parameters for the BMW M4 GT3 customer racing program, subject to FIA and
            SRO Balance of Performance (BoP) regulations per racing series.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-8" role="tablist" aria-label="Specification Categories">
          {categories.map((cat) => (
            <button
              key={cat.id}
              role="tab"
              aria-selected={activeCategory === cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded text-xs uppercase tracking-wider font-medium transition-colors cursor-pointer min-h-[36px] ${
                activeCategory === cat.id
                  ? "bg-[#0066b1] text-white font-semibold"
                  : "bg-zinc-900 text-zinc-300 hover:text-white hover:bg-zinc-800 border border-zinc-800"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Specifications Table/Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSpecs.map((spec, idx) => (
            <div
              key={idx}
              className="car-panel p-6 rounded border border-zinc-800 flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-mono text-[#0066b1] uppercase block mb-1">
                  {spec.system}
                </span>
                <span className="text-base font-bold text-white block mb-2">
                  {spec.value}
                </span>
              </div>
              <p className="text-xs text-zinc-400 pt-3 border-t border-zinc-800/80">
                {spec.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

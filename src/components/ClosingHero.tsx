"use client";

import React, { useState } from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";

export default function ClosingHero() {
  const [formData, setFormData] = useState({
    teamName: "",
    contactName: "",
    email: "",
    series: "IMSA WeatherTech GTD Pro / GTD",
  });

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [referenceId, setReferenceId] = useState("");

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    if (!formData.teamName.trim() || formData.teamName.trim().length < 3) {
      errors.teamName = "Please enter a valid racing team or organization name (minimum 3 characters).";
    }
    if (!formData.contactName.trim() || formData.contactName.trim().length < 2) {
      errors.contactName = "Please enter your contact representative name.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errors.email = "Please enter a valid official email address.";
    }
    return errors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setIsSubmitting(true);

    // Simulate verified form dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      const generatedRef = "M4GT3-" + Math.floor(100000 + Math.random() * 900000);
      setReferenceId(generatedRef);
    }, 800);
  };

  return (
    <section id="inquire" className="scroll-mt-24 bg-black text-slate-100 border-t border-zinc-800">
      {/* Full-Width Visual Hero Display (Frame 240) */}
      <div className="relative w-full h-[60vh] min-h-[440px] overflow-hidden bg-black">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/sequence/ezgif-frame-240.jpg"
          alt="BMW M4 GT3 Track Homologated Finish"
          className="w-full h-full object-cover object-center"
        />

        {/* Crisp Gradient Transition */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

        {/* Content on Image */}
        <div className="absolute bottom-12 left-6 md:left-12 right-6 md:right-12 max-w-3xl">
          <span className="text-xs font-semibold tracking-wider uppercase text-[#0066b1] block mb-2">
            Final Specification
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase">
            BMW M4 GT3 Ready For Competition
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-200 leading-relaxed font-normal">
            Homologated for international GT3 customer racing series worldwide. Contact BMW M Motorsport
            Customer Racing for chassis order allocations, spare parts logistics, and trackside engineering support.
          </p>
        </div>
      </div>

      {/* Customer Racing Allocation Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Customer Racing Program Details */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-semibold tracking-wider uppercase text-[#0066b1] block mb-2">
              Customer Racing Program
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Factory Technical Support & Parts Infrastructure
            </h3>
            <p className="text-sm text-zinc-300 leading-relaxed">
              Customer teams campaigning the BMW M4 GT3 receive dedicated technical services directly from BMW M
              Motorsport engineers. At major international endurance races, factory parts trucks are stationed on site
              to provide immediate replacement access for all mechanical and carbon bodywork components.
            </p>

            <div className="space-y-4 pt-2">
              <div className="p-4 rounded border border-zinc-800 bg-zinc-950">
                <h4 className="font-semibold text-white text-sm mb-1">Base Vehicle Allocation</h4>
                <p className="text-xs text-zinc-400">
                  Ready-to-race chassis delivered with FIA GT3 technical documentation, baseline setup sheets, and Bosch data logger calibrations.
                </p>
              </div>

              <div className="p-4 rounded border border-zinc-800 bg-zinc-950">
                <h4 className="font-semibold text-white text-sm mb-1">Trackside Engineering</h4>
                <p className="text-xs text-zinc-400">
                  Direct access to factory vehicle dynamics specialists for chassis balance, BoP adaptation, and transmission mapping.
                </p>
              </div>

              <div className="p-4 rounded border border-zinc-800 bg-zinc-950">
                <h4 className="font-semibold text-white text-sm mb-1">Fanatec Simulator Hardware Integration</h4>
                <p className="text-xs text-zinc-400">
                  Customer drivers can utilize identical real-car steering wheel hardware during virtual testing sessions ahead of race weekends.
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-6">
            <div className="car-panel p-8 rounded border border-zinc-800">
              {submitSuccess ? (
                <div className="py-8 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400 mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-bold text-white">Chassis Allocation Request Recorded</h4>
                  <p className="text-sm text-zinc-300 max-w-md mx-auto">
                    Your inquiry has been logged under reference{" "}
                    <span className="font-mono font-bold text-[#0066b1]">{referenceId}</span>. A BMW M Motorsport customer
                    racing representative will contact your team regarding build slot availability.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitSuccess(false);
                      setFormData({ teamName: "", contactName: "", email: "", series: "IMSA WeatherTech GTD Pro / GTD" });
                    }}
                    className="mt-4 px-4 py-2 rounded bg-zinc-800 hover:bg-zinc-700 text-xs text-white uppercase tracking-wider font-semibold cursor-pointer"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="border-b border-zinc-800 pb-3 mb-4">
                    <h4 className="text-lg font-bold text-white">
                      Customer Race Team Allocation Request
                    </h4>
                    <p className="text-xs text-zinc-400 mt-1">
                      Direct inquiries for verified racing organizations and prospective GT3 entrants.
                    </p>
                  </div>

                  <div>
                    <label htmlFor="teamName" className="text-xs font-semibold uppercase text-zinc-300 block mb-1.5">
                      Racing Team / Organization Name *
                    </label>
                    <input
                      id="teamName"
                      type="text"
                      value={formData.teamName}
                      onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                      placeholder="e.g. Schubert Motorsport, Turner Motorsport"
                      className={`w-full px-3.5 py-2.5 rounded bg-black border text-sm text-white placeholder-zinc-500 focus:outline-none ${
                        formErrors.teamName ? "border-red-500" : "border-zinc-800 focus:border-[#0066b1]"
                      }`}
                    />
                    {formErrors.teamName && (
                      <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> {formErrors.teamName}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contactName" className="text-xs font-semibold uppercase text-zinc-300 block mb-1.5">
                        Team Contact / Principal *
                      </label>
                      <input
                        id="contactName"
                        type="text"
                        value={formData.contactName}
                        onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                        placeholder="Full Name"
                        className={`w-full px-3.5 py-2.5 rounded bg-black border text-sm text-white placeholder-zinc-500 focus:outline-none ${
                          formErrors.contactName ? "border-red-500" : "border-zinc-800 focus:border-[#0066b1]"
                        }`}
                      />
                      {formErrors.contactName && (
                        <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" /> {formErrors.contactName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className="text-xs font-semibold uppercase text-zinc-300 block mb-1.5">
                        Official Team Email *
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="racing@team.com"
                        className={`w-full px-3.5 py-2.5 rounded bg-black border text-sm text-white placeholder-zinc-500 focus:outline-none ${
                          formErrors.email ? "border-red-500" : "border-zinc-800 focus:border-[#0066b1]"
                        }`}
                      />
                      {formErrors.email && (
                        <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" /> {formErrors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="series" className="text-xs font-semibold uppercase text-zinc-300 block mb-1.5">
                      Intended Competition Series
                    </label>
                    <select
                      id="series"
                      value={formData.series}
                      onChange={(e) => setFormData({ ...formData, series: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded bg-black border border-zinc-800 text-sm text-white focus:outline-none focus:border-[#0066b1] cursor-pointer"
                    >
                      <option value="IMSA WeatherTech GTD Pro / GTD">
                        IMSA WeatherTech SportsCar Championship (GTD Pro / GTD)
                      </option>
                      <option value="Fanatec GT World Challenge (Europe / America / Asia)">
                        Fanatec GT World Challenge (Europe / America / Asia)
                      </option>
                      <option value="24h Nürburgring Nordschleife & NLS Series">
                        24h Nürburgring Nordschleife & NLS Series
                      </option>
                      <option value="Super GT / DTM / British GT">
                        DTM / Super GT / British GT Championship
                      </option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-4 rounded bg-[#0066b1] hover:bg-blue-700 disabled:opacity-60 text-white font-semibold uppercase tracking-wider text-xs transition-colors cursor-pointer min-h-[44px]"
                  >
                    {isSubmitting ? "Processing Request..." : "Submit Allocation Request"}
                  </button>

                  <p className="text-[11px] text-zinc-500 text-center">
                    Confidential communication channel for BMW M Customer Racing.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Clean Footer */}
      <footer className="border-t border-zinc-900 py-10 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <div className="flex items-center gap-3">
            <span className="font-bold text-white uppercase tracking-wider">
              BMW M Motorsport
            </span>
            <div className="flex h-3 w-5 overflow-hidden skew-x-[-15deg]">
              <div className="w-1/3 bg-[#0066b1]" />
              <div className="w-1/3 bg-[#002663]" />
              <div className="w-1/3 bg-[#e00000]" />
            </div>
          </div>

          <p>
            Official BMW M4 GT3 Technical Showcase &amp; FIA Homologation Reference.
          </p>
        </div>
      </footer>
    </section>
  );
}

# BMW M4 GT3 Showcase

A premium, cinematic BMW M4 GT3 showcase web application featuring a smooth 240-frame scroll-driven image sequence reveal, FIA GT3 technical specifications, and customer racing engineering details. Built with Next.js, TypeScript, and Tailwind CSS.

## Key Features

- **240-Frame Scroll-Driven Image Sequence**: High-performance canvas-based sequence scrubbing, preloaded in memory with responsive aspect-ratio scaling and bidirectional smooth reverse playback.
- **Purebred GT3 Architecture**: Overview of the chassis structure, welded FIA 8862-2009 roll cage, and lightweight carbon composite body panels.
- **Powertrain Breakdown**: In-depth analysis of the BMW P58 3.0-litre M TwinPower Turbo inline-six engine (590 HP / 700+ Nm), dry-sump lubrication, additive-manufactured cylinder head core, and interactive dyno power curve.
- **Aerodynamics & Downforce**: Technical breakdown of the swan-neck adjustable rear wing, front carbon splitter with dive planes, and multi-channel underbody diffuser.
- **Cockpit Systems**: Dual-use Fanatec carbon competition steering wheel (compatible with both the real racecar and PC simulators), Bosch DDU10 digital dashboard, and center console calibration selectors.
- **Homologation Matrix**: Categorized specifications for engine, drivetrain, suspension, brakes, and dimensions.
- **Customer Racing Allocation Inquiries**: Functional race team chassis inquiry form with validation and tracking reference ID generation.

## Getting Started

First, install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to explore the showcase.

## Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Graphics**: HTML5 2D Canvas with requestAnimationFrame

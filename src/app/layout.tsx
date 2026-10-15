import type { Metadata } from "next";
import "./globals.css";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "BMW M4 GT3 | Technical Showcase & Homologation Overview",
  description:
    "Explore the engineering, powertrain, aerodynamics, and cockpit systems of the BMW M4 GT3 customer racing car, featuring an interactive frame-by-frame visual scroll sequence.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-black text-slate-100 antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HH Goa 2026 Frame Generator | Hacker House Goa",
  description: "Create your official Hacker House Goa 2026 profile picture frame. Upload your photo, adjust your fit, and share your builder badge with #FrameInGoa.",
  keywords: [
    "Hacker House Goa",
    "HH Goa 2026",
    "Goa Hackathon",
    "Profile Picture Frame",
    "Frame Generator",
    "#FrameInGoa",
    "Developers",
    "Hackers",
    "Web3",
    "Tech Event"
  ],
  authors: [{ name: "Hacker House Goa Team" }],
  icons: {
    icon: "/HHGoa.png",
    shortcut: "/HHGoa.png",
    apple: "/HHGoa.png",
  },
  openGraph: {
    title: "HH Goa 2026 Frame Generator | Frame Your Build",
    description: "Instantly create your Hacker House Goa 2026 branded PFP frame. Upload, position, download & share with #FrameInGoa.",
    url: "https://hh-goa-2026.vercel.app",
    siteName: "Hacker House Goa 2026",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HH Goa 2026 Frame Generator",
    description: "Frame your build for Hacker House Goa 2026! 28-31 OCT, Goa, India. #FrameInGoa",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#07090e] text-slate-100 antialiased min-h-screen selection:bg-cyan-500 selection:text-black">
        {children}
      </body>
    </html>
  );
}

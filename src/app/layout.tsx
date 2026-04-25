import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Snow from "@/components/Snow";
import WelcomeModal from "@/components/WelcomeModal";
import AudioPlayer from "@/components/AudioPlayer";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Quest Log of Gab | Gaming Portfolio",
  description:
    "A gaming portfolio showcasing career stats, achievements, and gaming history across League of Legends, Valorant, Mobile Legends, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Snow />
        <WelcomeModal />
        <AudioPlayer />
        {children}
      </body>
    </html>
  );
}

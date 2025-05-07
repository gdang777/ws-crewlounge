import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Crew Lounge - Aviation Community",
  description: "A platform for aviation professionals to find crashpads, vacation rentals, and gig opportunities",
};

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ClientAuthProvider from "../components/ClientAuthProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientAuthProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ClientAuthProvider>
      </body>
    </html>
  );
}

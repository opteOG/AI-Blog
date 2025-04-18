import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/general/Navbar";
import { AuthProvider } from "@/app/components/general/AuthProvider";
import { ThemesProvider } from "./components/general/ThemesProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "next demo",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased *
        max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`}
        >
          <ThemesProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
          >
            <Navbar></Navbar>
            {children}
          </ThemesProvider>
        </body>
      </html>
    </AuthProvider>
  );
}

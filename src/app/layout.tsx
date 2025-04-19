import type { Metadata } from "next";
import { ASFNav } from "@/components/ui/tasf_components/ASFNav";
import { Geist, Geist_Mono } from "next/font/google";
import { ClientProvider } from "@/lib/client-provider";

import "@/app/globals.css";
import { useEffect } from "react";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "TalentedASF",
    description: "The next generation athlete sponsorship tool.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased mx-auto`}
            >
                <ClientProvider>
                    <ASFNav />
                    {children}
                </ClientProvider>
            </body>
        </html>
    );
}

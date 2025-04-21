import type { Metadata } from "next";
import { ASFNav } from "@/components/ui/tasf_components/ASFNav";
import { Geist, Geist_Mono } from "next/font/google";
import { ClientProvider } from "@/lib/client-provider";
import { createClient } from "@/utils/supabase/server";

import type { dataFormat } from "@/lib/types";

import "@/app/globals.css";
import { getAthletesFromDatabase } from "@/utils/supabase/db";
import { AthleteProvider } from "@/lib/datactx";

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

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    const dashboardData: dataFormat[] = await getAthletesFromDatabase();
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased mx-auto`}
            >
                <ClientProvider>
                    {user && <ASFNav userName={user.user_metadata.name} />}
                    <AthleteProvider initialData={dashboardData}>
                        {children}
                    </AthleteProvider>
                </ClientProvider>
            </body>
        </html>
    );
}

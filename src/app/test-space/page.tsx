"use client";

import { useClient } from "@/lib/client-provider";
import data from "@/app/dummy-data.json";
import { useEffect } from "react";
export default function Page() {
    useEffect(() => {
        const func = async () => {
            const supabase = useClient();
        };

        func();
    }, []);
    return (
        <main className="flex justify-center items-center w-full h-screen">
            Hi
        </main>
    );
}

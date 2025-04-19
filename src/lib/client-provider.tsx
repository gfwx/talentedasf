"use client";

import { createContext, useContext } from "react";
import { createClient } from "@/utils/supabase/client";

const client = createClient();

const ClientContext = createContext<ReturnType<typeof createClient> | null>(
    null
);

export const ClientProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <ClientContext.Provider value={client}>
            {children}
        </ClientContext.Provider>
    );
};

export const useClient = () => {
    const ctx = useContext(ClientContext);
    if (!ctx) throw new Error("useClient used outside of ClientProvider!");
    return ctx;
};

"use client";

import { createContext, useContext } from "react";
import { dataFormat } from "@/lib/types";

const AthleteContext = createContext<dataFormat[] | any[]>([]);

export const AthleteProvider = ({
    children,
    initialData,
}: {
    children: React.ReactNode;
    initialData: [] | dataFormat[];
}) => {
    return (
        <AthleteContext.Provider value={initialData}>
            {children}
        </AthleteContext.Provider>
    );
};

export const useAthleteData = () => {
    const context = useContext(AthleteContext);
    if (context === null)
        throw new Error("useAthleteData must be used within AthleteProvider");
    return context;
};

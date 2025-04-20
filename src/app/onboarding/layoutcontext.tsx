import { createContext, useState, ReactNode } from "react";

type LayoutContextType = {
    prog: number;
    setProgress: (val: number) => void;
};

export const LayoutContext = createContext<LayoutContextType>({
    prog: 0,
    setProgress: () => {},
});

export const LayoutProvider = ({ children }: { children: ReactNode }) => {
    const [prog, setProgress] = useState(0);

    return (
        <LayoutContext.Provider value={{ prog, setProgress }}>
            {children}
        </LayoutContext.Provider>
    );
};

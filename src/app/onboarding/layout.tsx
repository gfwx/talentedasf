import { ASFLogo } from "@/components/ui/tasf_components/ASFLogo";
import { useState, ReactNode } from "react";
import { LayoutProvider } from "./layoutcontext";

export default function OnboardingLayout({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <>
            <nav className="w-full p-8 flex justify-center">
                <ASFLogo size={100} />
            </nav>
            <section>{children}</section>
        </>
    );
}

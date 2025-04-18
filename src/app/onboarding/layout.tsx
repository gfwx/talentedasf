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
            <section>{children}</section>
        </>
    );
}

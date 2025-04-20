import { ASFLogo } from "@/components/ui/tasf_components/ASFLogo";
import { useState, ReactNode } from "react";
import { createServerClientWrapper } from "@/lib/server-provider";

export default async function OnboardingLayout({
    children,
}: {
    children: ReactNode;
}) {
    return <section>{children}</section>;
}

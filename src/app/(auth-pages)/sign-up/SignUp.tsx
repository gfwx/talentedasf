"use client";

import { FormMessage, Message } from "@/components/form-message";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/submit-button";
import React from "react";
import { signUpAction } from "@/app/actions";

import { createClient } from "@/utils/supabase/client";

export default function Signup(props: { searchParams: Message | null }) {
    const message = props.searchParams;

    if (message && "message" in message) {
        return (
            <div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4">
                <FormMessage message={message} />
            </div>
        );
    }

    return (
        <div className="m-8 w-full h-full">
            <form className="flex flex-col min-w-64 max-w-64 mx-auto mt-auto">
                <h1 className="text-2xl font-medium">Sign up</h1>
                <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        name="email"
                        placeholder="you@example.com"
                        required
                    />
                    <Label htmlFor="password">Password</Label>
                    <Input
                        type="password"
                        name="password"
                        placeholder="Your password"
                        minLength={6}
                        required
                    />
                    <SubmitButton
                        formAction={signUpAction}
                        pendingText="Signing up..."
                    >
                        Sign up
                    </SubmitButton>

                    {message && <FormMessage message={message} />}
                </div>
            </form>
        </div>
    );
}

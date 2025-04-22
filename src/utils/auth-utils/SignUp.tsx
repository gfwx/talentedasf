"use client";

import { FormMessage, Message } from "@/components/form-message";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/submit-button";
import React from "react";
import { signUpAction } from "@/utils/auth-utils/actions";

export default function Signup(props: { searchParams: Message | null }) {
  const message = props.searchParams;

  if (message && "message" in message) {
    return (
      <div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4">
        <form className="flex flex-col min-w-64 mx-auto mt-auto"></form>
        <FormMessage message={message} />
      </div>
    );
  }

  return (
    <section className="w-full flex items-center justify-center flex-col gap-4">
      <h1 className="text-4xl font-bold">Create a new account</h1>
      <form className="flex flex-col min-w-64 mx-auto mt-auto">
        <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
          <Label htmlFor="firstName">First Name</Label>
          <Input name="firstName" placeholder="John" required />
          <Label htmlFor="lastName">Last Name</Label>
          <Input name="lastName" placeholder="Doe" required />

          <Label htmlFor="email">Email</Label>
          <Input name="email" placeholder="you@example.com" required />
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            name="password"
            placeholder="Your password"
            minLength={6}
            required
          />
          <SubmitButton formAction={signUpAction} pendingText="Signing up...">
            Sign up
          </SubmitButton>

          {message && <FormMessage message={message} />}
        </div>
      </form>
    </section>
  );
}

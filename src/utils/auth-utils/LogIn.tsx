"use client";

import { signInAction } from "@/utils/auth-utils/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function Login(props: { searchParams: Message | null }) {
  const message = props.searchParams;
  return (
    <section className="w-full flex items-center justify-center flex-col gap-4">
      <h1 className="text-4xl font-bold">Login to an existing account</h1>
      <form className="flex-1 flex flex-col min-w-64">
        <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
          <Label htmlFor="email">Email</Label>
          <Input name="email" placeholder="you@example.com" required />
          <div className="flex justify-between items-center">
            <Label htmlFor="password">Password</Label>
            <Link
              className="text-xs text-foreground underline"
              href="/forgot-password"
            >
              Forgot Password?
            </Link>
          </div>
          <Input
            type="password"
            name="password"
            placeholder="Your password"
            required
          />
          <SubmitButton pendingText="Signing In..." formAction={signInAction}>
            Sign in
          </SubmitButton>

          {message && <FormMessage message={message} />}
        </div>
      </form>
    </section>
  );
}

"use client";

import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { GoogleLogo } from "phosphor-react";
import loginSplash from "@/app/static/images/login_splash.svg";
import Link from "next/link";

export default async function Login(props: { searchParams: Promise<Message> }) {
    const searchParams = await props.searchParams;
    return (
        <div className="flex h-full items-center justify-between w-full mx-auto">
            <Image src={loginSplash} alt={"TASF Logo"} />
            <section className="w-full flex items-center justify-center flex-col gap-4">
                <h1 className="text-4xl font-bold">
                    Login to an existing account
                </h1>
                <form className="flex-1 flex flex-col min-w-64">
                    <p className="text-sm text-foreground">
                        Don't have an account?{" "}
                        <Link
                            className="text-foreground font-medium underline"
                            href="/sign-up"
                        >
                            Sign up
                        </Link>
                    </p>
                    <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            name="email"
                            placeholder="you@example.com"
                            required
                        />
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
                        <SubmitButton
                            pendingText="Signing In..."
                            formAction={signInAction}
                        >
                            Sign in
                        </SubmitButton>
                        <FormMessage message={searchParams} />
                    </div>
                </form>

                <div className="flex items-center w-full gap-4 max-w-sm">
                    <Separator className="flex-1" />
                    <span className="text-sm text-muted-foreground">
                        OR CONTINUE WITH
                    </span>
                    <Separator className="flex-1" />
                </div>
                <Button
                    className="cursor-pointer"
                    type="submit"
                    variant="outline"
                >
                    <GoogleLogo weight="bold" />
                    Google
                </Button>
            </section>
        </div>
    );
}

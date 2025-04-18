import { signUpAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { GoogleLogo } from "phosphor-react";
import tasfLogo from "@/app/static/images/tasf-logo.svg";

export default async function Signup(props: {
    searchParams: Promise<Message>;
}) {
    const searchParams = await props.searchParams;
    if ("message" in searchParams) {
        return (
            <div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4">
                <Image
                    src={tasfLogo}
                    width={50}
                    height={50}
                    alt={"tASF Logo"}
                />
                <FormMessage message={searchParams} />
            </div>
        );
    }

    return (
        <div className="m-8 w-full h-full">
            <Image src={tasfLogo} width={70} height={70} alt={"tASF Logo"} />

            <form className="flex flex-col min-w-64 max-w-64 mx-auto mt-auto">
                <h1 className="text-2xl font-medium">Sign up</h1>
                <p className="text-sm text text-foreground">
                    Already have an account?{" "}
                    <Link
                        className="text-primary font-medium underline"
                        href="/sign-in"
                    >
                        Sign in
                    </Link>
                </p>
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
                    <FormMessage message={searchParams} />
                </div>
            </form>
        </div>
    );
}

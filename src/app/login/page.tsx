"use client";

import { Mail } from "lucide-react";
import loginSplash from "@/app/static/images/login_splash.svg";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { GoogleLogo } from "phosphor-react";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { login } from "./actions";

const formSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters" }),
});

function ProfileForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        const formData = new FormData();
        formData.set("email", values.email);
        formData.set("password", values.password);
        login(formData);
    }

    return (
        <Card className="border-none shadow-none">
            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="flex flex-col gap-4"
                    >
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Email"
                                            type="email"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Enter your email address.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Password"
                                            type="password"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Make sure you set a password at least 8
                                        characters long.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button
                            type="submit"
                            className="cursor-pointer bg-black text-white"
                        >
                            <Mail /> Login with Email
                        </Button>
                    </form>
                </Form>
            </CardContent>
            <CardFooter>
                <Button variant="link" className="w-full cursor-pointer">
                    Don't have an account? Sign up.
                </Button>
            </CardFooter>
        </Card>
    );
}

export default function LoginPage() {
    return (
        <div className="flex h-full items-center justify-between w-full mx-auto">
            <Image src={loginSplash} alt={"TASF Logo"} />
            <section className="w-full flex items-center justify-center flex-col gap-4">
                <h1 className="text-4xl font-bold">
                    Login to an existing account
                </h1>
                <ProfileForm />
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

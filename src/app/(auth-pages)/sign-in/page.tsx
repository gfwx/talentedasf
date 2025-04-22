"use client";

import { Message } from "@/components/form-message";
import Image from "next/image";
import loginSplash from "@/app/static/images/login_splash.svg";
import Login from "@/utils/auth-utils/LogIn";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Signup from "@/utils/auth-utils/SignUp";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const [isSigningUp, setIsSigningUp] = useState(true);
  const [message, setMessage] = useState<Message | null>(null);

  const searchParams = useSearchParams();

  useEffect(() => {
    const getMessageFromParams = async () => {
      const param = searchParams.get("message");
      if (param) {
        try {
          const parsed: Message = JSON.parse(param);
          setMessage(parsed);
        } catch (err) {
          console.error("Failed to parse search param", err);
        }
      }
    };

    getMessageFromParams();
  }, [searchParams]);

  return (
    <div className="flex h-full items-center justify-between w-full mx-auto">
      <Image src={loginSplash} alt={"TASF Logo"} />
      <section className="w-full flex flex-col gap-8 items-center">
        {isSigningUp ? (
          <Signup searchParams={message} />
        ) : (
          <Login searchParams={message} />
        )}

        <p className="text-sm text-foreground">
          {isSigningUp
            ? "Already have an account?"
            : "Don't have an account?"}
          <Button
            className="text-foreground font-medium"
            variant={"link"}
            onClick={() => setIsSigningUp(!isSigningUp)}
          >
            {isSigningUp ? "Sign in" : "Sign up"}
          </Button>
        </p>
      </section>
    </div>
  );
}

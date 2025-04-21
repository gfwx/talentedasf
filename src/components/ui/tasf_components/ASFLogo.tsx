import React from "react";
import logo from "@/app/static/images/tasf-logo.svg";
import Link from "next/link";

import Image from "next/image";

export function ASFLogo({ size }: { size: number }) {
    return (
        <>
            <Link href="/">
                <Image
                    src={logo}
                    height={size}
                    width={size}
                    alt={"TASF Logo"}
                />
            </Link>
        </>
    );
}

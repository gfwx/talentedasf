import React from "react";
import logo from "@/app/static/images/tasf-logo.svg";

import Image from "next/image";

export function ASFLogo(size: number) {
    return (
        <>
            <Image src={logo} height={size} width={size} alt={"TASF Logo"} />
        </>
    );
}

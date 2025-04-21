"use client";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import pfp from "@/app/static/images/cool.gif";
import { useState, useRef } from "react";

import Image from "next/image";

export function ASFCard({
    fullName,
    athleteType,
    imgUrl,
    sponsorshipGoal,
    sponsorshipCurrent,
    competingSport,
    nationality,
    popularityScore,
    athleteSlug,
}: {
    fullName: string;
    athleteType: string;
    imgUrl: string | null;
    sponsorshipGoal: number;
    sponsorshipCurrent: number;
    competingSport: string;
    nationality: string;
    popularityScore: number;
    athleteSlug: string;
}) {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = cardRef.current?.getBoundingClientRect();
        if (!rect) return;

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        setMousePos({ x, y });
    };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            whileHover={{ scale: 1.05 }}
            transition={{
                type: "spring",
                stiffness: 200,
                damping: 10,
            }}
            style={{
                transformOrigin: "center center",
                perspective: 1000,
            }}
        >
            <motion.div
                style={{
                    transform: `translate3d(${(mousePos.x - 150) / 50}px, ${(mousePos.y - 100) / 50}px, 0)`,
                }}
                transition={{ ease: "easeOut", duration: 0.1 }}
            >
                <Card className="w-[300px] h-fit min-h-[400px] cursor-pointer">
                    <CardHeader>
                        <Image
                            src={pfp}
                            width={500}
                            height={300}
                            alt="Athlete profile picture"
                            className="w-full rounded-md"
                        />
                    </CardHeader>
                    <CardContent>
                        <h1 className="font-bold tracking-tighter uppercase text-lg">
                            {fullName}
                        </h1>
                        <h3 className="font-light tracking-tight">
                            {athleteType}
                        </h3>
                        <div>{nationality}</div>
                    </CardContent>
                    <CardFooter className="flex flex-col items-start">
                        <div>Sponsorship Goal</div>
                        <div className="flex justify-between w-full">
                            <div>{sponsorshipCurrent}</div>
                            <div>{sponsorshipGoal}</div>
                        </div>
                    </CardFooter>
                </Card>
            </motion.div>
        </motion.div>
    );
}

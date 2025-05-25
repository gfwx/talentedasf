"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import pfp from "@/app/static/images/cool.gif";
import { useState, useRef } from "react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Tables } from "@/lib/database.types";

type Events = Tables<"events">


export function ASFCard({
  id,
  fullName,
  athleteType,
  imgUrl,
  sponsorshipGoal,
  sponsorshipCurrent,
  competingSport,
  nationality,
  popularityScore,
  athleteSlug,
  bio,
}: {
  id: string;
  fullName: string;
  athleteType: string;
  imgUrl: string | null;
  sponsorshipGoal: number;
  sponsorshipCurrent: number;
  competingSport: string;
  nationality: string;
  popularityScore: number;
  athleteSlug: string;
  bio: string
}) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [dialogOpen, setDialogOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // WARNING: TERRIBLE PRACTISE!
  imgUrl = `https://eyluvqxrqfihmhxojklw.supabase.co/storage/v1/object/public/pfp/${imgUrl}`;

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMousePos({ x, y });
  };

  const handleViewProfile = () => {
    setDialogOpen(false);
    router.push(`/athletes/${id}`);
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Card className="w-[300px] cursor-pointer flex flex-col justify-between h-full pt-0 overflow-hidden hover:border-primary border-2 transition">
          <div>
            <CardHeader className='w-full h-[200px] relative overflow-hidden mb-8'>
              <Image
                src={imgUrl}
                fill={true}
                alt="Athlete profile picture"
                style={{ objectFit: 'cover', zIndex: 0 }}
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
          </div>
          <CardFooter className="flex flex-col items-start gap-2 w-full mt-auto">
            <div>Sponsorship Goal</div>
            <div className="flex justify-between w-full">
              <div>{sponsorshipCurrent}$</div>
              <div>{sponsorshipGoal}$</div>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary"
                style={{
                  width: `${Math.min(100, (sponsorshipCurrent / sponsorshipGoal) * 100)}%`
                }}
              ></div>
            </div>
          </CardFooter>
        </Card>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[850px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{fullName}</DialogTitle>
          <DialogDescription className="text-md">{athleteType} • {nationality}</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
          <div className="flex flex-col gap-4">
            <div className="relative w-full h-[300px] rounded-lg overflow-hidden">
              <Image
                src={imgUrl}
                fill={true}
                alt="Athlete profile picture"
                style={{ objectFit: 'cover' }}
                className="rounded-lg"
              />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold text-lg">Sponsorship</h3>
              <div className="flex justify-between w-full">
                <div>Current: ${sponsorshipCurrent}</div>
                <div>Goal: ${sponsorshipGoal}</div>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary"
                  style={{
                    width: `${Math.min(100, (sponsorshipCurrent / sponsorshipGoal) * 100)}%`
                  }}
                ></div>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between">
            <div>
              <h3 className="font-semibold text-lg mb-2">About</h3>
              <p className="text-gray-700 dark:text-gray-300">
                {bio || `${fullName} is a ${athleteType} from ${nationality} competing in ${competingSport}.`}
              </p>

              <div className="mt-4">
                <h3 className="font-semibold text-lg mb-2">Details</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-gray-500 dark:text-gray-400">Sport:</div>
                  <div>{competingSport}</div>
                  <div className="text-gray-500 dark:text-gray-400">Popularity:</div>
                  <div>{popularityScore}/10</div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <Button onClick={handleViewProfile} className="w-full">
                View Full Profile
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

"use client";

import data from "@/app/dummy-data.json";
import { ASFCard } from "@/components/ui/tasf_components/ASFCard";
import { useAthleteData } from "@/lib/datactx";
import { dataFormat } from "@/lib/types";

export default function Home() {
    const data = useAthleteData();
    console.log(data);
    const athleteCards = data.map((athlete: dataFormat) => {
        return (
            <ASFCard
                key={athlete.uuid}
                fullName={athlete.name}
                athleteType={athlete.highest_level}
                imgUrl={athlete.photo}
                sponsorshipGoal={athlete["sponsorship_goal"]}
                sponsorshipCurrent={athlete["sponsorship_current"]}
                competingSport={athlete.quick_bio.sport}
                nationality={athlete.nationality}
                popularityScore={10}
                athleteSlug={athlete.username}
            />
        );
    });
    return (
        <main className="">
            <section className="mx-8">
                <h1 className="text-4xl font-extrabold tracking-tight">
                    TalentedASF Athletes
                </h1>
                <div className="flex flex-row gap-4 flex-wrap">
                    {athleteCards}
                </div>
            </section>
        </main>
    );
}

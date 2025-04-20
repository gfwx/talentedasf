"use client";
import data from "@/app/dummy-data.json";
import { ASFCard } from "@/components/ui/tasf_components/ASFCard";

export default function Home() {
    const athleteCards = data.map((athlete: any) => {
        return (
            <ASFCard
                key={athlete.uuid}
                fullName={athlete.username}
                athleteType={athlete?.athleteType}
                imgUrl={athlete?.imgUrl}
                sponsorshipGoal={athlete["sponsorship_goal"]}
                sponsorshipCurrent={athlete["sponsorship_current"]}
                competingSport={athlete.competingSport}
                nationality={athlete.nationality}
                popularityScore={athlete.popularityScore}
                athleteSlug={athlete.athleteSlug}
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

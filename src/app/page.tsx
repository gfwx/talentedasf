"use client";

import { ASFCard } from "@/components/ui/tasf_components/ASFCard";
import {
    ASFFilters,
    FilterState,
} from "@/components/ui/tasf_components/ASFFilters";
import { useAthleteData } from "@/lib/datactx";
import { dataFormat } from "@/lib/types";
import { useState } from "react";

export default function Home() {
    const data = useAthleteData();
    console.log(data);
    const [filters, setFilters] = useState<FilterState>({
        nationality: "all",
        sponsorshipRange: "all",
        sport: "all",
    });

    const filterAthletes = (athletes: dataFormat[]) => {
        return athletes.filter((athlete) => {
            if (
                filters.nationality !== "all" &&
                athlete.nationality !== filters.nationality
            ) {
                return false;
            }

            if (
                filters.sport !== "all" &&
                athlete.quick_bio.sport !== filters.sport
            ) {
                return false;
            }

            if (filters.sponsorshipRange !== "all") {
                const goal = athlete.sponsorship_goal;
                const [min, max] = filters.sponsorshipRange
                    .split("-")
                    .map(Number);

                if (filters.sponsorshipRange === "100000+") {
                    if (goal <= 100000) return false;
                } else {
                    if (goal < min || goal > max) return false;
                }
            }

            return true;
        });
    };

    const filteredAthletes = filterAthletes(data);

    const handleFilterChange = (newFilters: FilterState) => {
        setFilters(newFilters);
    };

    return (
        <main className="">
            <section className="mx-8">
                <h1 className="text-4xl font-black tracking-tighter mb-8">
                    Talented <i>ASF</i> Athletes
                </h1>
                <ASFFilters
                    data={data}
                    onFilterChange={handleFilterChange}
                    currentFilters={filters}
                />
                <div className="flex flex-row gap-4 flex-wrap">
                    {filteredAthletes.map((athlete: dataFormat) => (
                        <ASFCard
                            key={athlete.id}
                            fullName={athlete.name}
                            athleteType={athlete.highest_level}
                            imgUrl={athlete.photo}
                            sponsorshipGoal={athlete.sponsorship_goal}
                            sponsorshipCurrent={athlete.sponsorship_current}
                            competingSport={athlete.quick_bio.sport}
                            nationality={athlete.nationality}
                            popularityScore={10}
                            athleteSlug={athlete.username}
                            id={athlete.id}
                        />
                    ))}
                </div>
            </section>
        </main>
    );
}

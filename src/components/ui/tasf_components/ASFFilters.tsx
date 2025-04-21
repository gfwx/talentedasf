import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { dataFormat } from "@/lib/types";
import { ChevronDown } from "lucide-react";

export type FilterState = {
    nationality: string;
    sponsorshipRange: string;
    sport: string;
};

type FilterProps = {
    data: dataFormat[];
    onFilterChange: (filters: FilterState) => void;
    currentFilters: FilterState;
};

export function ASFFilters({
    data,
    onFilterChange,
    currentFilters,
}: FilterProps) {
    const nationalities = Array.from(
        new Set(data.map((item) => item.nationality))
    );

    const sports = Array.from(
        new Set(data.map((item) => item.quick_bio.sport))
    );

    const sponsorshipRanges = [
        "1-10000",
        "10000-50000",
        "50000-100000",
        "100000+",
    ];

    const handleFilterChange = (type: keyof FilterState, value: string) => {
        onFilterChange({
            ...currentFilters,
            [type]: value,
        });
    };

    const getActiveFilters = () => {
        const active = [];
        if (currentFilters.nationality !== "all")
            active.push(`Nationality: ${currentFilters.nationality}`);
        if (currentFilters.sponsorshipRange !== "all")
            active.push(`Sponsorship: $${currentFilters.sponsorshipRange}`);
        if (currentFilters.sport !== "all")
            active.push(`Sport: ${currentFilters.sport}`);
        return active;
    };

    return (
        <div className="flex flex-col gap-4 mb-8">
            <div className="flex gap-4">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                            Nationality <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>
                            Filter by Nationality
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioGroup
                            value={currentFilters.nationality}
                            onValueChange={(value) =>
                                handleFilterChange("nationality", value)
                            }
                        >
                            <DropdownMenuRadioItem value="all">
                                All
                            </DropdownMenuRadioItem>
                            {nationalities.map((nationality) => (
                                <DropdownMenuRadioItem
                                    key={nationality}
                                    value={nationality}
                                >
                                    {nationality}
                                </DropdownMenuRadioItem>
                            ))}
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                            Sponsorship Range{" "}
                            <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>
                            Filter by Sponsorship
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioGroup
                            value={currentFilters.sponsorshipRange}
                            onValueChange={(value) =>
                                handleFilterChange("sponsorshipRange", value)
                            }
                        >
                            <DropdownMenuRadioItem value="all">
                                All
                            </DropdownMenuRadioItem>
                            {sponsorshipRanges.map((range) => (
                                <DropdownMenuRadioItem
                                    key={range}
                                    value={range}
                                >
                                    ${range}
                                </DropdownMenuRadioItem>
                            ))}
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                            Sport <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>Filter by Sport</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioGroup
                            value={currentFilters.sport}
                            onValueChange={(value) =>
                                handleFilterChange("sport", value)
                            }
                        >
                            <DropdownMenuRadioItem value="all">
                                All
                            </DropdownMenuRadioItem>
                            {sports.map((sport) => (
                                <DropdownMenuRadioItem
                                    key={sport}
                                    value={sport}
                                >
                                    {sport}
                                </DropdownMenuRadioItem>
                            ))}
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {getActiveFilters().length > 0 && (
                <div className="flex gap-2 flex-wrap">
                    {getActiveFilters().map((filter, index) => (
                        <div
                            key={index}
                            className="bg-primary/10 text-primary text-sm px-3 py-1 rounded-full"
                        >
                            {filter}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

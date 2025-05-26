import { createClient } from "@/utils/supabase/server";
import { dataFormat, EventData } from "@/lib/types";
import { Metadata } from "next";

export async function getAthleteData(slug: string) {
  const supabase = await createClient();

  // Fetch athlete data
  const { data, error } = await supabase
    .from("athletes")
    .select("*")
    .eq("id", slug)
    .single();

  if (error || !data) {
    return { athlete: null, events: [] };
  }

  // Fetch events for this athlete
  const { data: eventsData, error: eventsError } = await supabase
    .from("events")
    .select("*")
    .eq("athlete_id", slug);

  const events: EventData[] = eventsError ? [] : eventsData || [];
  const athlete: dataFormat = { ...data, events };

  return { athlete, events };
}

export async function generateAthleteMetadata(
  slug: string
): Promise<Metadata> {
  const { athlete } = await getAthleteData(slug);

  if (!athlete) {
    return {
      title: "Athlete Not Found",
    };
  }

  return {
    title: athlete.name,
    description: athlete.bio || `Profile page for ${athlete.name}`,
    openGraph: {
      images: athlete.photo ? 
        [`https://eyluvqxrqfihmhxojklw.supabase.co/storage/v1/object/public/pfp/${athlete.photo}`] : 
        [],
    },
  };
}
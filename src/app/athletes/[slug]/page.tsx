import Image from "next/image";
import { createClient } from "@/utils/supabase/server";
import { dataFormat, EventData, Socials } from "@/lib/types";
import { Calendar } from "lucide-react";
import { ASFCardEvent } from "@/components/ui/tasf_components/ASFCardEvent";
import { SocialMediaLink } from "@/components/ui/tasf_components/SocialMediaLink";

type PageProps = {
  params: { slug: string };
};

export default async function AthletePage({ params }: PageProps) {
  const supabase = await createClient();
  const { slug } = params;

  const { data, error } = await supabase
    .from("athletes")
    .select("*")
    .eq("id", slug)
    .single();

  if (error || !data) return <div>Athlete not found</div>;

  // Fetch events for this athlete
  const { data: eventsData, error: eventsError } = await supabase
    .from("events")
    .select("*")
    .eq("athlete_id", slug);

  const events: EventData[] = eventsError ? [] : eventsData || [];
  const athlete: dataFormat = { ...data, events };
  const imgUrl = `https://eyluvqxrqfihmhxojklw.supabase.co/storage/v1/object/public/pfp/${athlete.photo}`;

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="relative w-full h-72 rounded-b-3xl overflow-hidden flex items-end justify-center">
        {athlete.photo && (
          <Image
            src={imgUrl}
            alt={athlete.name}
            width={300}
            height={500}
            className="absolute bottom-0 object-contain"
          />
        )}
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 text-center">
        <h1 className="text-4xl font-bold mb-2">{athlete.name}</h1>

        <div className="flex justify-center gap-6 text-sm text-gray-600 mb-4">
          {athlete.socials ? (
            <SocialMediaLink socials={athlete.socials} size="md" className="mx-auto" />
          ) : (
            <>
              <div className="flex items-center gap-1">
                <span>📷</span> <span>-</span>
              </div>
              <div className="flex items-center gap-1">
                <span>✖️</span> <span>-</span>
              </div>
            </>
          )}
        </div>

        {athlete.bio && (
          <div className="mb-8 max-w-2xl mx-auto">
            <h2 className="text-lg font-semibold mb-2 text-left">About</h2>
            <p className="text-left text-gray-700">{athlete.bio}</p>
          </div>
        )}

        <div className="text-left space-y-2 border-t pt-6">
          <div className="flex flex-col">
            <p className="text-2xl font-bold">Is competing in</p>
            <p className="text-md">{athlete.quick_bio.sport}</p>
          </div>
          <div className="flex flex-col">
            <p className="text-2xl font-bold">For the past</p>
            <p className="text-md">
              {athlete.quick_bio.experience} years
            </p>
          </div>
          <div className="flex flex-col">
            <p className="text-2xl font-bold">
              And is currently competing in
            </p>
            <p className="text-md">{athlete.quick_bio.level}</p>
          </div>
          <div className="flex flex-col">
            <p className="text-2xl font-bold">But also,</p>
            <p className="text-md">
              {athlete.quick_bio.other_activity}
            </p>
          </div>
        </div>

        <div className="mt-10 text-left">
          <h2 className="text-lg font-semibold mb-4 border-t pt-4">
            Events & Competitions
          </h2>
          <div className="w-full">
            <ASFCardEvent events={events} />
          </div>
        </div>

        <div className="mt-10 text-right">
          <a
            href="#"
            className="text-xs uppercase font-semibold tracking-wide text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
          >
            Are you a sponsor?
          </a>
        </div>
      </div>
    </div>
  );
}

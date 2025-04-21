import Image from "next/image";
import { createClient } from "@/utils/supabase/server";
import { dataFormat } from "@/lib/types";
import { Calendar } from "lucide-react";

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

    const athlete: dataFormat = data;
    const imgUrl = `https://eyluvqxrqfihmhxojklw.supabase.co/storage/v1/object/public/pfp/${athlete.photo}`;

    return (
        <div className="min-h-screen bg-white text-black">
            <div className="relative w-full h-72 bg-gradient-to-r  rounded-b-3xl overflow-hidden flex items-end justify-center">
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

                <div className="flex justify-center gap-6 text-sm text-gray-600 mb-8">
                    <div className="flex items-center gap-1">
                        <span>📷</span> <span>17.6M</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <span>✖️</span> <span>17.6M</span>
                    </div>
                </div>

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
                    <h2 className="text-lg font-semibold mb-4">
                        Upcoming Competitions
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                        {[...Array(4)].map((_, i) => (
                            <div
                                key={i}
                                className="border rounded-xl py-4 px-2 shadow-sm"
                            >
                                <div className="text-2xl font-bold text-red-600">
                                    30
                                </div>
                                <div className="text-sm uppercase">March</div>
                                <div className="mt-1 text-xs text-gray-600">
                                    Formula One <br /> XYZ Grand Prix <br />
                                    <span className="italic">
                                        Interlagos, Brazil
                                    </span>
                                </div>
                            </div>
                        ))}
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

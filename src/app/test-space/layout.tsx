// app/layout.tsx
import { createClient } from "@/utils/supabase/server";
import dummyData from "@/app/dummy-data.json";

const loadDummyData = async () => {
    const supabase = await createClient();
    const { data, error } = await supabase.from("athletes").insert(dummyData);

    if (error) return error;
    return data;
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const result = await loadDummyData();

    return (
        <html lang="en">
            <body>
                <div>
                    {Array.isArray(result)
                        ? "✅ Success!"
                        : `❌ ${result?.message}`}
                </div>
                {children}
            </body>
        </html>
    );
}

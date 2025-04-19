// lib/server-client.ts
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createServerClientWrapper() {
    const cookieStore = cookies(); // no need for await

    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll: async () => await cookieStore.getAll(),
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(
                            async ({ name, value, options }) => {
                                await cookieStore.set(name, value, options);
                            }
                        );
                    } catch {
                        // ignore errors from server components
                    }
                },
            },
        }
    );
}

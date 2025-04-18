import { ASFNav } from "@/components/ui/tasf_components/ASFNav";
export default function Home() {
    type NavItem = {
        title: string;
        url: string;
    };

    const navItems: NavItem[] = [
        { title: "Profile", url: "" },
        { title: "Dashboard", url: "" },
    ];

    return (
        <main className="">
            <section className="mx-8">
                <h1 className="text-4xl font-extrabold tracking-tight">
                    TalentedASF Athletes
                </h1>
            </section>
        </main>
    );
}

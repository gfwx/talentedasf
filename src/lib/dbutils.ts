import { redirect } from "next/navigation";
import { createServerClientWrapper } from "./server-provider";
const createUser = async () => {
    const supabase = await createServerClientWrapper();
    const auth = supabase.auth;
    const { data, error } = await auth.getUser();

    const user = data.user;
    if (user) {
        const { error, data } = await supabase
            .from("users")
            .insert({
                id: user.id,
                full_name: user.user_metadata.full_name ?? "John Doe",
                email_id: user.email,
                user_role: "user",
                is_active: true,
            })
            .select();

        if (error) {
            console.log(error);
            redirect("/error");
        }

        return data;
    }

    if (error) {
        console.log(error);
        redirect("/error");
    }
};

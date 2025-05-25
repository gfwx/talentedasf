import { createClient } from "./server";

const getUsersFromDatabase = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("users")
    .select("*, users(full_name)");

  if (error) {
    console.log(`Error while fetching data: ${error.message}`);
    return [];
  }
};

export const getAthletesFromDatabase = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.from("athletes").select("*");

  if (error) {
    console.log(`Error while fetching data: ${error.message}`);
    return [];
  }

  return data;
};

export const getCurrentAthleteFromDatabase = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.from("athletes").select("*").single();

  if (error) {
    console.log(`Error while fetching data: ${error.message}`);
    return null;
  }

  return data;
};

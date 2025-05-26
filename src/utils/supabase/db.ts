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
  const { data: athletes, error: athletesError } = await supabase.from("athletes").select("*");

  if (athletesError) {
    console.log(`Error while fetching athletes data: ${athletesError.message}`);
    return [];
  }

  // Fetch all events
  const { data: events, error: eventsError } = await supabase.from("events").select("*");

  if (eventsError) {
    console.log(`Error while fetching events data: ${eventsError.message}`);
    return athletes; // Return athletes without events if events fetch fails
  }

  // Assign events to their respective athletes
  const athletesWithEvents = athletes.map(athlete => {
    const athleteEvents = events.filter(event => event.athlete_id === athlete.id);
    return {
      ...athlete,
      events: athleteEvents || []
    };
  });

  return athletesWithEvents;
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

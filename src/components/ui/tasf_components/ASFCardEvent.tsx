"use client";

import { EventData } from "@/lib/types";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useMemo } from "react";

type EventCategorized = {
  event: EventData;
  category: "upcoming" | "later" | "past";
  isNextEvent?: boolean;
};

export function ASFCardEvent({ events }: { events: EventData[] }) {
  const categorizedEvents = useMemo(() => {
    if (!events || events.length === 0) return { upcoming: [], later: [], past: [] };

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    // Sort events by date
    const sortedEvents = [...events].sort((a, b) => {
      const dateA = new Date(a.event_date);
      const dateB = new Date(b.event_date);
      return dateA.getTime() - dateB.getTime();
    });

    const categorized: EventCategorized[] = sortedEvents.map(event => {
      const eventDate = new Date(event.event_date);
      if (eventDate < today) {
        return { event, category: "past" };
      } else {
        return { event, category: "later" };
      }
    });

    // Find the first upcoming event (closest future event)
    const futureEvents = categorized.filter(e => e.category === "later");

    if (futureEvents.length > 0) {
      // Mark the first future event as "upcoming"
      futureEvents[0].category = "upcoming";
      futureEvents[0].isNextEvent = true;

      // The rest remain as "later"
    }

    // Group events by category
    const grouped = {
      upcoming: categorized.filter(e => e.category === "upcoming"),
      later: categorized.filter(e => e.category === "later"),
      past: categorized.filter(e => e.category === "past").reverse() // Most recent past events first
    };

    return grouped;
  }, [events]);

  if (!events || events.length === 0) {
    return <div className="text-muted-foreground text-sm">No events scheduled</div>;
  }

  return (
    <div className="space-y-4 w-full">
      {categorizedEvents.upcoming.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold mb-2 text-primary">Upcoming</h4>
          {categorizedEvents.upcoming.map(({ event, isNextEvent }) => (
            <div
              key={event.event_id}
              className={`rounded-md p-3 w-full ${isNextEvent ? 'border-2 border-primary' : 'border'}`}
            >
              <div className="font-bold">{event.event_name}</div>
              <div className="text-sm text-muted-foreground">{event.championship_name}</div>
              <div className="text-xs flex items-center mt-1 text-muted-foreground">
                <CalendarIcon className="h-3 w-3 mr-1" />
                {format(new Date(event.event_date), "PPP")}
              </div>
            </div>
          ))}
        </div>
      )}

      {categorizedEvents.later.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold mb-2">Later</h4>
          <div className="space-y-2 max-h-[150px] overflow-y-auto pr-1 w-full">
            {categorizedEvents.later.map(({ event }) => (
              <div key={event.event_id} className="rounded-md p-2 border w-full">
                <div className="font-bold">{event.event_name}</div>
                <div className="text-sm text-muted-foreground">{event.championship_name}</div>
                <div className="text-xs flex items-center mt-1 text-muted-foreground">
                  <CalendarIcon className="h-3 w-3 mr-1" />
                  {format(new Date(event.event_date), "PPP")}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {categorizedEvents.past.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold mb-2 text-gray-500">Past</h4>
          <div className="space-y-2 max-h-[120px] overflow-y-auto pr-1 w-full">
            {categorizedEvents.past.map(({ event }) => (
              <div key={event.event_id} className="rounded-md p-2 border border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700 w-full">
                <div className="font-bold">{event.event_name}</div>
                <div className="text-sm text-muted-foreground">{event.championship_name}</div>
                <div className="text-xs flex items-center mt-1 text-muted-foreground">
                  <CalendarIcon className="h-3 w-3 mr-1" />
                  {format(new Date(event.event_date), "PPP")}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

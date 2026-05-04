import type { Event } from "@/payload-types";

import { EventRow } from "@/components/events/EventRow";

type UpcomingListProps = {
  events: Event[];
};

export function UpcomingList({ events }: UpcomingListProps) {
  if (events.length === 0) return null;
  return (
    <div style={{ borderTop: "1px solid var(--rule-strong)" }}>
      {events.map((ev) => (
        <EventRow key={ev.id} event={ev} />
      ))}
      <style>{`
        @media (max-width: 880px) {
          .event-row { grid-template-columns: 1fr !important; }
          .event-row > div:nth-child(4) { justify-self: start !important; }
        }
      `}</style>
    </div>
  );
}

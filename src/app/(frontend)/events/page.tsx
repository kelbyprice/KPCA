import { getPayload } from "payload";
import config from "@payload-config";

import type { Event } from "@/payload-types";

import { PageTitle } from "@/components/atoms/PageTitle";
import { SectionHeader } from "@/components/atoms/SectionHeader";
import { EventHero } from "@/components/events/EventHero";
import { UpcomingList } from "@/components/events/UpcomingList";
import { PastList } from "@/components/events/PastList";

async function loadEvents(): Promise<Event[]> {
  try {
    const payload = await getPayload({ config });
    const res = await payload.find({
      collection: "events",
      sort: "date",
      limit: 100,
    });
    return res.docs as Event[];
  } catch (err) {
    console.error("Failed to load events from Payload:", err);
    return [];
  }
}

export default async function EventsPage() {
  const events = await loadEvents();

  const now = new Date();
  const upcoming = events.filter((e) => new Date(e.date) >= now);
  const past = events
    .filter((e) => new Date(e.date) < now)
    // Most recent past first.
    .sort((a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf());

  const featured = upcoming.find((e) => e.featured) ?? null;
  const upcomingRest = featured
    ? upcoming.filter((e) => e.id !== featured.id)
    : upcoming;

  return (
    <main className="page-fade" data-screen-label="04 Events">
      <PageTitle
        eyebrow="Calendar"
        title="Events."
        subtitle="Convenings, working groups, and the calendar that turns a list of individuals and firms into a working community."
        num={4}
        total={6}
      />

      <section className="section">
        <div className="container">
          <SectionHeader
            eyebrow="Upcoming"
            kicker="Q2 — Q3 2026"
            title="Upcoming."
          />
          {featured && <EventHero event={featured} />}
          <UpcomingList events={upcomingRest} />
        </div>
      </section>

      <section
        className="section"
        style={{
          background: "var(--bg-elev)",
          borderTop: "1px solid var(--rule)",
        }}
      >
        <div className="container">
          <SectionHeader
            eyebrow="Past"
            title="Past."
            lede="Programming archive. Public-facing events visible to all; member-only events visible to logged-in members in v2."
          />
          <PastList events={past} />
        </div>
      </section>
    </main>
  );
}

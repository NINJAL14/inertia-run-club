import { EventCard } from "@/components/event-card";
import { events } from "@/lib/data";

export default function EventsPage() {
  return (
    <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-primary sm:text-5xl">
          Upcoming Events
        </h1>
        <p className="mt-4 text-xl text-muted-foreground">
          Lace up your shoes and join us for our next run!
        </p>
      </div>
      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}

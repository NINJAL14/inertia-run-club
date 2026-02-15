'use client';

import { EventCard } from "@/components/event-card";
import { events } from "@/lib/data";
import { Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function EventsPage() {
  // A live member count on a public page by fetching all user documents is not secure.
  // We've replaced it with a static number to resolve the permissions error.
  // A better long-term solution involves a backend counter updated by Cloud Functions.
  const memberCount = "150+";

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

      <div className="my-12 max-w-xs mx-auto">
        <Card className="text-center">
            <CardHeader className="flex flex-row items-center justify-center space-y-0 pb-2">
                <Users className="h-6 w-6 text-muted-foreground mr-3" />
                <CardTitle className="text-lg font-medium">Active Members</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-4xl font-bold">{memberCount}</div>
                <p className="text-xs text-muted-foreground mt-1">
                    runners in our community
                </p>
            </CardContent>
        </Card>
      </div>

      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}

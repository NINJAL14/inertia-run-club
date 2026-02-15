'use client';

import { EventCard } from "@/components/event-card";
import { events, galleryImages } from "@/lib/data";
import { Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

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

      <div className="mx-auto max-w-2xl text-center mt-24">
        <h2 className="text-4xl font-extrabold tracking-tight text-primary sm:text-5xl">
          Moments in Motion
        </h2>
        <p className="mt-4 text-xl text-muted-foreground">
          A glimpse into our community, our runs, and our shared passion.
        </p>
      </div>

      <div className="mt-12 columns-2 gap-4 sm:columns-3 xl:columns-4">
        {galleryImages.map((image) => (
          <div key={image.id} className="relative mb-4 break-inside-avoid">
             <Card className="overflow-hidden">
                <Image
                  src={image.imageUrl}
                  alt={image.description}
                  data-ai-hint={image.imageHint}
                  width={600}
                  height={600}
                  className="h-auto w-full transform rounded-lg object-cover transition-transform duration-300 hover:scale-105"
                />
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

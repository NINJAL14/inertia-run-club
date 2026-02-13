import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { weeklyUpdates } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";

export default function HomePage() {
  const heroImage = PlaceHolderImages.find((p) => p.id === "hero");
  const latestUpdate = weeklyUpdates[0];

  return (
    <div className="flex flex-col">
      <section className="relative h-[60vh] min-h-[500px] w-full">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            data-ai-hint={heroImage.imageHint}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-black/40 to-black/70" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
          <h1 className="font-headline text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Find Your Stride
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-neutral-200 md:text-xl">
            Welcome to Inertia, the university's premier running club. We're a
            community of runners dedicated to fitness, friendship, and the joy
            of the open road.
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link href="/events">
              Join a Run <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">Weekly Highlight</h2>
            <p className="mt-4 text-lg text-muted-foreground">
                Stay up to date with the latest news and achievements from our club.
            </p>
        </div>
        <div className="mt-12">
          <Card className="overflow-hidden">
            <div className={cn("grid gap-4", latestUpdate.image ? "md:grid-cols-2" : "md:grid-cols-1")}>
              {latestUpdate.image && (
                <div className="relative min-h-[300px] w-full">
                   <Image
                      src={latestUpdate.image}
                      alt={latestUpdate.title}
                      fill
                      className="object-cover"
                    />
                </div>
              )}
              <div className="flex flex-col justify-center">
                <CardHeader>
                  <CardTitle className="text-2xl">{latestUpdate.title}</CardTitle>
                  <CardDescription>
                    {new Date(latestUpdate.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{latestUpdate.content}</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" asChild>
                    <Link href="/gallery">View Gallery</Link>
                  </Button>
                </CardFooter>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}

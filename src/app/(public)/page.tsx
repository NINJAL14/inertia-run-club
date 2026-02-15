import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { EventCard } from "@/components/event-card";
import { events } from "@/lib/data";
import { Target, Users, Zap } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const values = [
    {
        icon: Users,
        title: 'Community',
        description: 'We foster a welcoming and inclusive environment for runners of all levels.',
    },
    {
        icon: Zap,
        title: 'Performance',
        description: 'We support each other in achieving personal fitness goals, from 5ks to marathons.',
    },
    {
        icon: Target,
        title: 'Persistence',
        description: 'We believe in the power of consistency and the mental strength built through running.',
    }
];


export default function HomePage() {
  // Place your video file in the `public` folder and update the path here.
  // For example, if your video is named `my-video.mp4`, the path would be "/my-video.mp4"
  const videoUrl = "/hero-video.mp4";

  // Assumes your images are in `public/imge` and are named image1.jpg, image2.jpg, etc.
  // Please update the `imageUrl` with the correct file paths.
  const sundayRunImages = [
    { id: 'sunday-run-1', imageUrl: '/imge/image1.jpg', description: 'Inertia run club members running together on a sunny morning.', imageHint: 'runners group' },
    { id: 'sunday-run-2', imageUrl: '/imge/image2.jpg', description: 'A scenic view from the Sunday run path.', imageHint: 'scenic view' },
    { id: 'sunday-run-3', imageUrl: '/imge/image3.jpg', description: 'Runners warming up and stretching before the event.', imageHint: 'runners warming up' },
    { id: 'sunday-run-4', imageUrl: '/imge/image4.jpg', description: 'A picture of the beautiful running trail.', imageHint: 'running trail' },
    { id: 'sunday-run-5', imageUrl: '/imge/image5.jpg', description: 'Club members celebrating after a successful run.', imageHint: 'runners celebrating' },
  ];

  return (
    <div className="flex flex-col">
      <section className="relative h-screen min-h-[700px] w-full flex items-center justify-center overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 z-0 h-full w-full object-cover"
        >
          <source
            src={videoUrl}
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 flex flex-col items-center justify-center text-center text-white p-4">
          <h1 className="font-headline font-extrabold italic tracking-tighter text-primary flex flex-col text-5xl sm:text-7xl md:text-8xl lg:text-9xl">
            <span className="block animate-reveal [animation-fill-mode:backwards]">MOMENTUM</span>
            <span className="block animate-reveal [animation-fill-mode:backwards] [animation-delay:200ms]">IS</span>
            <span className="block animate-reveal [animation-fill-mode:backwards] [animation-delay:400ms]">EVERYTHING</span>
          </h1>
          <p className="mt-8 max-w-3xl text-lg text-neutral-300">
            Panvel's homegrown run club.
          </p>
          <p className="mt-2 max-w-3xl text-lg text-neutral-300">
            We are{" "}
            <span className="font-bold text-neutral-100">
              Inertia Run Club
            </span>
            . We don't just run; we move forward together. Join the city's most
            electric running community.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/events">JOIN NEXT RUN</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/about">OUR STORY</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Join Us Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center lg:max-w-4xl">
                <h2 className="text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
                    Why Run With Inertia?
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                    We're more than a club; we're a movement. Here's what we're all about.
                </p>
            </div>
            <div className="mt-12 grid max-w-lg mx-auto gap-10 lg:max-w-none lg:grid-cols-3 lg:gap-8">
                {values.map((value) => (
                    <div key={value.title} className="flex flex-col items-center text-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <value.icon className="h-8 w-8" />
                        </div>
                        <div className="mt-4">
                            <h3 className="text-xl font-bold">{value.title}</h3>
                            <p className="mt-2 text-muted-foreground">
                                {value.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Sunday Morning Runs Section */}
      <section className="bg-card py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-8 md:grid-cols-2 lg:gap-16">
                <div className="space-y-4">
                    <h2 className="text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
                        Sunday Morning Runs
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Every Sunday, we hit the pavement for our flagship group run. It's the perfect way to kick off your week, with routes for all levels and a great community vibe. Whether you're chasing a new personal best or just looking for a friendly jog, you'll find your pace with us.
                    </p>
                    <p className="text-lg text-muted-foreground">
                        The energy is contagious, the scenery is beautiful, and the post-run coffee is always rewarding.
                    </p>
                    <Button asChild size="lg" variant="link" className="pl-0">
                        <Link href="/events">See All Runs &rarr;</Link>
                    </Button>
                </div>
                <Carousel className="w-full" opts={{ loop: true }}>
                    <CarouselContent>
                        {sundayRunImages.map((image) => (
                            <CarouselItem key={image.id}>
                                <div className="relative h-96 w-full overflow-hidden rounded-lg shadow-xl">
                                    <Image
                                        src={image.imageUrl}
                                        alt={image.description}
                                        data-ai-hint={image.imageHint}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="absolute left-4 z-10 hidden sm:flex bg-white/20 hover:bg-white/40 text-white border-0" />
                    <CarouselNext className="absolute right-4 z-10 hidden sm:flex bg-white/20 hover:bg-white/40 text-white border-0" />
                </Carousel>
            </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center lg:max-w-4xl">
                <h2 className="text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
                    Upcoming Runs
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                    Lace up your shoes and join us for our next adventure.
                </p>
            </div>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {events.slice(0, 3).map((event) => (
                    <EventCard key={event.id} event={event} />
                ))}
            </div>
            <div className="mt-12 text-center">
                <Button asChild size="lg">
                    <Link href="/events">View All Events</Link>
                </Button>
            </div>
        </div>
      </section>

    </div>
  );
}

import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <section className="relative h-screen min-h-[700px] w-full flex items-center justify-center overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-1/2 left-1/2 w-full h-full object-cover transform -translate-x-1/2 -translate-y-1/2 z-0"
        >
          <source
            src="https://videos.pexels.com/video-files/852395/852395-hd_1920_1080_25fps.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 flex flex-col items-center justify-center text-center text-white p-4">
          <h1 className="font-headline font-extrabold tracking-tighter text-primary flex flex-col text-5xl sm:text-7xl md:text-8xl lg:text-9xl">
            <span>MOMENTUM</span>
            <span>IS</span>
            <span>EVERYTHING</span>
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
    </div>
  );
}

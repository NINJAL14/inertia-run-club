import type { Event, WeeklyUpdate, GalleryImage } from "@/lib/types";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export const events: Event[] = [
  {
    id: "1",
    title: "Sunrise City Run",
    description: "Join us for a refreshing 5k run through the city center as the sun comes up. All paces welcome!",
    date: "2024-08-15",
    time: "06:00 AM",
    location: "Downtown Plaza",
    image: PlaceHolderImages.find(p => p.id === "event1")!.imageUrl,
    createdAt: "2024-07-20T10:00:00Z",
  },
  {
    id: "2",
    title: "Trailblazer Challenge",
    description: "Test your endurance with a challenging 10k trail run. Hills, mud, and glory await.",
    date: "2024-08-22",
    time: "09:00 AM",
    location: "Oakwood Park Trails",
    image: PlaceHolderImages.find(p => p.id === "event2")!.imageUrl,
    createdAt: "2024-07-21T11:00:00Z",
  },
  {
    id: "3",
    title: "Lakeside Loop",
    description: "A scenic and flat 7k run around the beautiful Crystal Lake. Perfect for a PB attempt or a relaxed jog.",
    date: "2024-08-29",
    time: "05:30 PM",
    location: "Crystal Lake",
    image: PlaceHolderImages.find(p => p.id === "event3")!.imageUrl,
    createdAt: "2024-07-22T12:00:00Z",
  },
];

export const weeklyUpdates: WeeklyUpdate[] = [
  {
    id: "1",
    title: "Big Turnout for the Trailblazer Challenge!",
    content: "What an incredible day at Oakwood Park! Over 50 members tackled the tough terrain and conquered the Trailblazer Challenge. The weather was perfect, and the post-run brunch was well-deserved. Thanks to everyone who came out and made it a memorable event. Check out the new photos in the gallery!",
    image: PlaceHolderImages.find(p => p.id === "update1")!.imageUrl,
    createdAt: "2024-08-23T14:00:00Z",
  },
  {
    id: "2",
    title: "New Weekly Social Run",
    content: "Starting next month, we're introducing a new casual social run every Wednesday evening. It's a great opportunity to meet other members, chat, and enjoy a relaxed pace. We'll end at a local cafe for coffee and snacks. More details on the events page!",
    createdAt: "2024-08-16T09:00:00Z",
  },
];

export const galleryImages: GalleryImage[] = PlaceHolderImages.filter(p => p.id.startsWith("gallery"));

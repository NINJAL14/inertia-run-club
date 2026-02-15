import type { SuggestOptimalScheduleOutput } from '@/ai/flows/suggest-optimal-schedule';
import type { ImagePlaceholder } from './placeholder-images';

export type Event = {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image: string;
  createdAt: string;
};

export type WeeklyUpdate = {
  id: string;
  title: string;
  content: string;
  image?: string;
  createdAt: string;
};

export type ScheduleSuggestion = SuggestOptimalScheduleOutput;

export type GalleryImage = ImagePlaceholder;

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  image: string;
  imageHint: string;
};

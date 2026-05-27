import { MessageSquare, Mic, Film, Radio, Youtube } from "lucide-react";

export interface MediaSourceConfig {
  icon: React.ElementType;
  label: string;
  slug: string;
  tagline: string;
  description: string;
  source: "youtube-playlist" | "youtube-channel" | "static";
  sourceId?: string; // Playlist ID or Channel ID
  staticData?: Array<{
    title: string;
    views: string;
    duration: string;
    thumbnail: string;
    link: string;
  }>;
}

export const mediaSourceConfig: Record<string, MediaSourceConfig> = {
  "featured-journeys": {
    icon: MessageSquare,
    label: "Featured Journeys",
    slug: "featured-journeys",
    tagline: "In their own words",
    description:
      "One-on-one conversations with persons with disabilities who've built careers, companies, and communities — told the way they actually lived them.",
    source: "youtube-playlist",
    sourceId: import.meta.env.VITE_FEATURED_JOURNEYS_PLAYLIST_ID,
  },
  "long-form-conversations": {
    icon: Mic,
    label: "Long-Form Conversations",
    slug: "long-form-conversations",
    tagline: "The full story",
    description:
      "Unhurried interviews where journeys unfold the way they're meant to — across employment, education, entrepreneurship, and the systems people had to learn to navigate.",
    source: "youtube-playlist",
    sourceId: import.meta.env.VITE_LONG_FORM_PLAYLIST_ID,
  },
};

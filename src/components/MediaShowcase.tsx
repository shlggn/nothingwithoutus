import { Eye, Play, Headphones, ArrowRight } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Hosts from "@/components/Hosts";
import { mediaSourceConfig } from "@/lib/mediaConfig";
import { fetchPlaylistVideos, fetchChannelVideos, isYouTubeConfigured } from "@/lib/youtube";

interface ContentItem {
  title: string;
  views: string;
  duration: string;
  thumbnail: string;
  link: string;
  videoId?: string;
}

const ScrollSection = ({ slug, index }: { slug: string; index: number }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  const section = mediaSourceConfig[slug];
  const isReels = section?.label === "Reels & TikTok";
  const isPodcast = section?.label === "Podcasts";

  useEffect(() => {
    const fetchData = async () => {
      if (!section) return;

      setLoading(true);

      try {
        if (section.source === "static" && section.staticData) {
          setItems(section.staticData);
          setLoading(false);
        } else if (
          (section.source === "youtube-playlist" || section.source === "youtube-channel") &&
          section.sourceId &&
          isYouTubeConfigured()
        ) {
          let videos;
          if (section.source === "youtube-playlist") {
            videos = await fetchPlaylistVideos(section.sourceId, 10);
          } else {
            videos = await fetchChannelVideos(section.sourceId, 10);
          }

          const transformedItems: ContentItem[] = videos.map((video) => ({
            title: video.title,
            views: video.viewCount,
            duration: video.duration,
            thumbnail: video.thumbnail,
            link: `https://www.youtube.com/watch?v=${video.videoId}`,
            videoId: video.videoId,
          }));

          setItems(transformedItems);
          setLoading(false);
        } else {
          // Fallback to sample data if YouTube not configured
          setItems(section.staticData || []);
          setLoading(false);
        }
      } catch (error) {
        console.error(`Error fetching data for ${section.label}:`, error);
        // Fallback to static data on error
        setItems(section.staticData || []);
        setLoading(false);
      }
    };

    fetchData();
  }, [slug, section]);

  if (!section) return null;

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const amount = direction === "left" ? -340 : 340;
      scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  return (
    <div id="media" className="py-14" style={{ background: "#6B5A4E" }}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="flex items-end justify-between mb-8">
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-2xl bg-primary-foreground backdrop-blur-sm flex items-center justify-center">
              <section.icon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3 mb-1">
                <h3 className="font-display text-2xl md:text-3xl text-white font-semibold">{section.label}</h3>
                <span className="font-semibold tracking-wider text-xs uppercase text-primary-foreground bg-primary px-3 py-1 rounded-full w-fit">
                  {section.tagline}
                </span>
              </div>
              <p className="text-white/90 text-md max-w-md md:max-w-full leading-relaxed">{section.description}</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-1.5">
            <button
              onClick={() => scroll("left")}
              className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:scale-105 hover:bg-white/20 transition-all text-white"
            >
              ←
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:scale-105 hover:bg-white/20 transition-all text-white"
            >
              →
            </button>
          </div>
        </div>
      </div>

      {/* Scrollable content */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide px-6 md:px-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))]"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {loading ? (
          // Show placeholder cards while loading
          [1, 2, 3].map((i) => (
            <div
              key={i}
              className={`group flex-shrink-0 ${
                isReels ? "w-52" : isPodcast ? "w-64" : "w-80"
              }`}
            >
              <div
                className={`relative overflow-hidden rounded-2xl bg-white/10 mb-3 shadow-sm animate-pulse ${
                  isReels ? "aspect-[9/16]" : isPodcast ? "aspect-square" : "aspect-video"
                }`}
              />
            </div>
          ))
        ) : (
          items.slice(0, 3).map((item, idx) => (
            <a
              key={item.videoId || item.title || idx}
              href={item.link}
              target={item.videoId ? "_blank" : "_self"}
              rel={item.videoId ? "noopener noreferrer" : ""}
              className={`group flex-shrink-0 ${
                isReels ? "w-52" : isPodcast ? "w-64" : "w-80"
              }`}
            >
              <div
                className={`relative overflow-hidden rounded-2xl bg-muted mb-3 shadow-sm ${
                  isReels ? "aspect-[9/16]" : isPodcast ? "aspect-square" : "aspect-video"
                }`}
              >
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {isPodcast ? (
                    <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
                      <Headphones className="w-5 h-5 text-primary" />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
                      <Play className="w-5 h-5 text-primary fill-primary ml-0.5" />
                    </div>
                  )}
                </div>
                {/* Duration badge */}
                <span className="absolute bottom-2.5 right-2.5 text-[11px] font-medium bg-black/70 backdrop-blur-sm rounded-lg px-2 py-1 text-white">
                  {item.duration}
                </span>
              </div>
              <h4 className="text-white text-md font-medium leading-snug group-hover:text-primary transition-colors line-clamp-2">
                {item.title}
              </h4>
              <p className="text-white/80 text-xs mt-1 flex items-center gap-1">
                <Eye className="w-3 h-3" />
                {item.views}
              </p>
            </a>
          ))
        )}

        {/* View all card */}
        <Link
          to={`/media/${section.slug}`}
          className={`flex-shrink-0 ${
            isReels ? "w-52" : isPodcast ? "w-64" : "w-80"
          } `}
        >
          <div
            className={`w-full rounded-2xl bg-white/10 backdrop-blur-sm hover:bg-white/15 flex flex-col items-center justify-center gap-3 transition-all duration-300 group/all ${
              isReels ? "aspect-[9/16]" : isPodcast ? "aspect-square" : "aspect-video"
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center group-hover/all:bg-primary/30 transition-colors">
              <ArrowRight className="w-4 h-4 text-primary" />
            </div>
            <span className="text-md text-white group-hover/all:text-primary transition-colors font-medium">
              View All
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

const MediaShowcase = () => {
  return (
    <section id="content" className="pt-60 md:pt-40" style={{ background: "#585856" }}>
      <div className="max-w-6xl mx-auto px-6 mb-4">
        <p className="text-primary-foreground font-semibold text-xs tracking-widest uppercase mb-3">
          The Series
        </p>
        <h2 className="font-display text-4xl md:text-5xl text-primary-foreground mb-4 max-w-4xl font-bold">
          Real journeys. Real strength. <a className="hidden md:block"></a>Documented as they are.
        </h2>
        <p className="text-primary-foreground max-w-4xl leading-relaxed">
          A growing archive of features, interviews, and conversations with persons with disabilities —
          across employment, education, entrepreneurship, and community leadership. Not stories of overcoming.
          Stories of capability.
        </p>
        {/* Inclusion Statement */}
        <div className="mt-20 mb-8">
          <div className="bg-primary-foreground rounded-3xl p-10 md:p-14 max-w-4xl">
            <div className="space-y-6">
              <p className="text-foreground text-foreground font-bold text-lg md:text-lg leading-relaxed">
                Because inclusion isn't charity. It isn't optics. And it isn't optional.
              </p>
              <div className="flex flex-wrap gap-3 md:gap-4">
                <span className="text-primary font-semibold text-xl md:text-xl tracking-wide">It's policy</span>
                <span className="text-primary/40">•</span>
                <span className="text-primary font-semibold text-xl md:text-xl tracking-wide">It's leadership</span>
                <span className="text-primary/40">•</span>
                <span className="text-primary font-semibold text-xl md:text-xl tracking-wide">It's design</span>
                <span className="text-primary/40">•</span>
                <span className="text-primary font-semibold text-xl md:text-xl tracking-wide">It's culture</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Hosts />

      {Object.keys(mediaSourceConfig).map((slug, i) => (
        <ScrollSection key={slug} slug={slug} index={i} />
      ))}
    </section>
  );
};

export default MediaShowcase;

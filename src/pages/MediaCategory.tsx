import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Eye, Play, Headphones, ArrowLeft, Loader2, AlertCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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

const MediaCategory = () => {
  const { slug } = useParams<{ slug: string }>();
  const categoryConfig = slug ? mediaSourceConfig[slug] : null;
  
  const [items, setItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMediaData = async () => {
      if (!categoryConfig) return;

      setLoading(true);
      setError(null);

      try {
        if (categoryConfig.source === "static" && categoryConfig.staticData) {
          // Use static data
          setItems(categoryConfig.staticData);
          setLoading(false);
        } else if (
          (categoryConfig.source === "youtube-playlist" ||
            categoryConfig.source === "youtube-channel") &&
          categoryConfig.sourceId
        ) {
          // Check if YouTube is configured
          if (!isYouTubeConfigured()) {
            setError(
              "YouTube API is not configured. Please add your API key to the .env file."
            );
            setLoading(false);
            return;
          }

          // Fetch from YouTube
          let videos;
          if (categoryConfig.source === "youtube-playlist") {
            videos = await fetchPlaylistVideos(categoryConfig.sourceId, 50);
          } else {
            videos = await fetchChannelVideos(categoryConfig.sourceId, 50);
          }

          // Transform YouTube videos to ContentItem format
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
        }
      } catch (err) {
        console.error("Error fetching media:", err);
        setError(
          "Failed to load videos. Please check your API configuration and try again."
        );
        setLoading(false);
      }
    };

    fetchMediaData();
  }, [slug, categoryConfig]);

  if (!categoryConfig) {
    return (
      <div className="min-h-screen bg-[#585856] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-display text-white mb-4">Category Not Found</h1>
          <Link to="/" className="text-primary hover:underline">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const Icon = categoryConfig.icon;
  const isReels = categoryConfig.label === "Reels & TikTok";
  const isPodcast = categoryConfig.label === "Podcasts";

  return (
    <div className="min-h-screen" style={{ background: "#585856" }}>
      <Navbar />
      
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Back button */}
          <Link 
            to="/#media" 
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Media
          </Link>

          {/* Category Header */}
          <div className="flex items-start gap-4 mb-12">
            <div className="w-16 h-16 rounded-2xl bg-primary-foreground backdrop-blur-sm flex items-center justify-center">
              <Icon className="w-8 h-8 text-primary" />
            </div>
            <div>
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3 mb-2">
                <h1 className="font-display text-4xl md:text-5xl text-white font-semibold">
                  {categoryConfig.label}
                </h1>
                <span className="font-semibold tracking-wider text-sm uppercase text-primary-foreground bg-primary px-4 py-2 rounded-full w-fit">
                  {categoryConfig.tagline}
                </span>
              </div>
              <p className="text-white/90 text-lg max-w-3xl leading-relaxed">
                {categoryConfig.description}
              </p>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-12 h-12 text-primary animate-spin" />
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-900/20 border border-red-800 rounded-2xl p-8 mb-8">
              <div className="flex items-start gap-4">
                <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-red-200 font-semibold text-lg mb-2">Failed to Load Videos</h3>
                  <p className="text-red-300/80 mb-4">{error}</p>
                  <p className="text-sm text-red-300/60">
                    Make sure you've configured your YouTube API key in the .env file and added your playlist IDs.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Media Grid */}
          {!loading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {items.map((item, index) => (
                <a
                  key={item.videoId || index}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
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
                        <div className="w-14 h-14 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
                          <Headphones className="w-6 h-6 text-primary" />
                        </div>
                      ) : (
                        <div className="w-14 h-14 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
                          <Play className="w-6 h-6 text-primary fill-primary ml-0.5" />
                        </div>
                      )}
                    </div>
                    {/* Duration badge */}
                    <span className="absolute bottom-2.5 right-2.5 text-xs font-medium bg-black/70 backdrop-blur-sm rounded-lg px-2.5 py-1 text-white">
                      {item.duration}
                    </span>
                  </div>
                  <h3 className="text-white text-base font-medium leading-snug group-hover:text-primary transition-colors line-clamp-2 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-white/80 text-sm flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5" />
                    {item.views}
                  </p>
                </a>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && items.length === 0 && (
            <div className="text-center py-20">
              <p className="text-white/60 text-lg">No videos found in this category yet.</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MediaCategory;

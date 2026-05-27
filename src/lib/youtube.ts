// YouTube Data API v3 Service
// Documentation: https://developers.google.com/youtube/v3/docs

interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  viewCount: string;
  publishedAt: string;
  videoId: string;
  channelTitle: string;
}

interface YouTubePlaylistResponse {
  items: Array<{
    snippet: {
      title: string;
      description: string;
      thumbnails: {
        high: { url: string };
        medium: { url: string };
        default: { url: string };
      };
      resourceId: {
        videoId: string;
      };
      channelTitle: string;
      publishedAt: string;
    };
    contentDetails?: {
      videoId: string;
    };
  }>;
}

interface YouTubeVideoDetailsResponse {
  items: Array<{
    id: string;
    contentDetails: {
      duration: string;
    };
    statistics: {
      viewCount: string;
    };
  }>;
}

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const BASE_URL = "https://www.googleapis.com/youtube/v3";

// Convert ISO 8601 duration to readable format (e.g., PT15M33S -> 15:33)
function parseDuration(duration: string): string {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  if (!match) return "0:00";

  const hours = (match[1] || "").replace("H", "");
  const minutes = (match[2] || "0M").replace("M", "");
  const seconds = (match[3] || "0S").replace("S", "");

  if (hours) {
    return `${hours}:${minutes.padStart(2, "0")}:${seconds.padStart(2, "0")}`;
  }
  return `${minutes}:${seconds.padStart(2, "0")}`;
}

// Format view count (e.g., 1234567 -> 1.2M views)
function formatViewCount(count: string): string {
  const num = parseInt(count);
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M views`;
  } else if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K views`;
  }
  return `${num} views`;
}

/**
 * Fetch videos from a YouTube playlist
 * @param playlistId - YouTube playlist ID
 * @param maxResults - Maximum number of videos to fetch (default: 20)
 */
export async function fetchPlaylistVideos(
  playlistId: string,
  maxResults: number = 20
): Promise<YouTubeVideo[]> {
  try {
    // Step 1: Get playlist items
    const playlistResponse = await fetch(
      `${BASE_URL}/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=${maxResults}&key=${API_KEY}`
    );

    if (!playlistResponse.ok) {
      throw new Error(`YouTube API error: ${playlistResponse.status}`);
    }

    const playlistData: YouTubePlaylistResponse = await playlistResponse.json();

    // Extract video IDs
    const videoIds = playlistData.items
      .map((item) => item.snippet.resourceId?.videoId || item.contentDetails?.videoId)
      .filter(Boolean)
      .join(",");

    if (!videoIds) {
      return [];
    }

    // Step 2: Get video details (duration and view count)
    const videoDetailsResponse = await fetch(
      `${BASE_URL}/videos?part=contentDetails,statistics&id=${videoIds}&key=${API_KEY}`
    );

    if (!videoDetailsResponse.ok) {
      throw new Error(`YouTube API error: ${videoDetailsResponse.status}`);
    }

    const videoDetailsData: YouTubeVideoDetailsResponse = await videoDetailsResponse.json();

    // Combine data
    const videos: YouTubeVideo[] = playlistData.items.map((item, index) => {
      const videoId = item.snippet.resourceId?.videoId || item.contentDetails?.videoId || "";
      const videoDetails = videoDetailsData.items.find((v) => v.id === videoId);

      return {
        id: videoId,
        videoId: videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium?.url,
        duration: videoDetails
          ? parseDuration(videoDetails.contentDetails.duration)
          : "0:00",
        viewCount: videoDetails
          ? formatViewCount(videoDetails.statistics.viewCount)
          : "0 views",
        publishedAt: item.snippet.publishedAt,
        channelTitle: item.snippet.channelTitle,
      };
    });

    return videos;
  } catch (error) {
    console.error("Error fetching YouTube playlist:", error);
    throw error;
  }
}

/**
 * Fetch videos from a YouTube channel
 * @param channelId - YouTube channel ID
 * @param maxResults - Maximum number of videos to fetch (default: 20)
 */
export async function fetchChannelVideos(
  channelId: string,
  maxResults: number = 20
): Promise<YouTubeVideo[]> {
  try {
    // Step 1: Get channel's uploads playlist ID
    const channelResponse = await fetch(
      `${BASE_URL}/channels?part=contentDetails&id=${channelId}&key=${API_KEY}`
    );

    if (!channelResponse.ok) {
      throw new Error(`YouTube API error: ${channelResponse.status}`);
    }

    const channelData = await channelResponse.json();
    const uploadsPlaylistId =
      channelData.items[0]?.contentDetails?.relatedPlaylists?.uploads;

    if (!uploadsPlaylistId) {
      throw new Error("Could not find uploads playlist for channel");
    }

    // Step 2: Fetch videos from uploads playlist
    return fetchPlaylistVideos(uploadsPlaylistId, maxResults);
  } catch (error) {
    console.error("Error fetching YouTube channel:", error);
    throw error;
  }
}

/**
 * Search for videos on YouTube
 * @param query - Search query
 * @param maxResults - Maximum number of results (default: 20)
 */
export async function searchYouTubeVideos(
  query: string,
  maxResults: number = 20
): Promise<YouTubeVideo[]> {
  try {
    const searchResponse = await fetch(
      `${BASE_URL}/search?part=snippet&q=${encodeURIComponent(
        query
      )}&type=video&maxResults=${maxResults}&key=${API_KEY}`
    );

    if (!searchResponse.ok) {
      throw new Error(`YouTube API error: ${searchResponse.status}`);
    }

    const searchData = await searchResponse.json();
    const videoIds = searchData.items.map((item: any) => item.id.videoId).join(",");

    if (!videoIds) {
      return [];
    }

    const videoDetailsResponse = await fetch(
      `${BASE_URL}/videos?part=contentDetails,statistics,snippet&id=${videoIds}&key=${API_KEY}`
    );

    if (!videoDetailsResponse.ok) {
      throw new Error(`YouTube API error: ${videoDetailsResponse.status}`);
    }

    const videoDetailsData: YouTubeVideoDetailsResponse = await videoDetailsResponse.json();

    return videoDetailsData.items.map((video: any) => ({
      id: video.id,
      videoId: video.id,
      title: video.snippet.title,
      thumbnail: video.snippet.thumbnails.high?.url || video.snippet.thumbnails.medium?.url,
      duration: parseDuration(video.contentDetails.duration),
      viewCount: formatViewCount(video.statistics.viewCount),
      publishedAt: video.snippet.publishedAt,
      channelTitle: video.snippet.channelTitle,
    }));
  } catch (error) {
    console.error("Error searching YouTube:", error);
    throw error;
  }
}

// Check if YouTube API is configured
export function isYouTubeConfigured(): boolean {
  return !!API_KEY && API_KEY !== "YOUR_API_KEY_HERE";
}

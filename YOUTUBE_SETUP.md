# YouTube API Setup Guide

This guide will walk you through setting up YouTube Data API v3 to fetch videos for the "Featured Journeys" and "Long-Form Conversations" sections.

## Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Sign in with your Google account
3. Click **"Select a project"** at the top → **"New Project"**
4. Enter a project name (e.g., "Nothing Without Us Media")
5. Click **"Create"**

## Step 2: Enable YouTube Data API v3

1. In your project, go to **APIs & Services** → **Library**
2. Search for **"YouTube Data API v3"**
3. Click on it and press **"Enable"**

## Step 3: Create API Credentials

1. Go to **APIs & Services** → **Credentials**
2. Click **"Create Credentials"** → **"API Key"**
3. Your API key will be generated and displayed
4. **Important:** Click **"Restrict Key"** to secure it:
   - Under **"API restrictions"**, select **"Restrict key"**
   - Choose **"YouTube Data API v3"** from the dropdown
   - Under **"Application restrictions"**, you can:
     - Select **"HTTP referrers"** and add your website domain (for production)
     - Or leave as **"None"** for development (less secure)
5. Click **"Save"**
6. Copy your API key

## Step 4: Get Your YouTube Playlist IDs

### Option A: Using an Existing Playlist
1. Go to your YouTube playlist
2. The URL will look like: `https://www.youtube.com/playlist?list=PLxxxxxxxxxxxxxxxxx`
3. Copy the `PLxxxxxxxxxxxxxxxxx` part (everything after `list=`)

### Option B: Create a New Playlist
1. Go to [YouTube Studio](https://studio.youtube.com/)
2. Click **"Playlists"** in the left sidebar
3. Click **"New Playlist"**
4. Add videos to your playlist
5. Copy the playlist ID from the URL as described in Option A

### Alternative: Using a Channel ID
Instead of playlists, you can fetch all videos from a channel:
1. Go to the YouTube channel
2. Click on any video from that channel
3. Right-click the channel name → **"Copy link address"**
4. The URL will contain the channel ID: `https://www.youtube.com/channel/UCxxxxxxxxxxxxxxxxx`
5. Copy the `UCxxxxxxxxxxxxxxxxx` part

## Step 5: Configure Your Environment

1. Open the `.env` file in your project root
2. Replace the placeholders with your actual values:

```env
# YouTube Data API v3 Key
VITE_YOUTUBE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXX

# Featured Journeys - Use your playlist or channel ID
VITE_FEATURED_JOURNEYS_PLAYLIST_ID=PLxxxxxxxxxxxxxxxxxxxx

# Long-Form Conversations - Use your playlist or channel ID
VITE_LONG_FORM_PLAYLIST_ID=PLyyyyyyyyyyyyyyyyyyyy
```

## Step 6: Restart Your Development Server

```bash
npm run dev
```

The app will now fetch real YouTube videos for these categories!

## API Quota Limits

YouTube Data API v3 has a daily quota:
- **Free tier**: 10,000 units per day
- **Playlist items request**: ~3 units per request
- **Video details request**: ~5 units per request
- **Total per category fetch**: ~8 units

This means you can fetch data approximately **1,250 times per day** for free, which is more than enough for most websites.

### Optimizations for Production:
- Implement caching (localStorage or server-side)
- Fetch data on build time instead of client-side
- Use webhooks to update only when new videos are added

## Troubleshooting

### Error: "YouTube API is not configured"
- Make sure your `.env` file has the correct API key
- Ensure the key starts with `AIzaSy`
- Restart your development server after adding the key

### Error: "Failed to load videos"
- Check if the YouTube Data API v3 is enabled in your Google Cloud project
- Verify your playlist/channel IDs are correct
- Check the browser console for detailed error messages
- Ensure your API key restrictions allow requests from your domain

### Videos not showing up
- Make sure the playlist is **public** or **unlisted** (not private)
- Verify the playlist has videos in it
- Check that your API key has not exceeded the daily quota

## Alternative: Using Sample Data

If you don't want to set up YouTube API right away, the app will automatically fall back to sample data for categories without valid API credentials. Simply leave the placeholders in the `.env` file.

## Security Notes

- **Never commit your `.env` file** to version control (it's already in `.gitignore`)
- For production, use environment variables on your hosting platform (Vercel, Netlify, etc.)
- Restrict your API key to specific domains in production
- Monitor your API usage in Google Cloud Console

## Need Help?

- [YouTube Data API Documentation](https://developers.google.com/youtube/v3/docs)
- [Google Cloud Console](https://console.cloud.google.com/)
- [API Key Best Practices](https://support.google.com/googleapi/answer/6310037)

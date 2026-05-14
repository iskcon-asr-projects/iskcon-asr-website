import { NextResponse } from "next/server";

export const revalidate = 60; // check every 60 seconds

export async function GET() {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const channelId = process.env.YOUTUBE_CHANNEL_ID;

  if (!apiKey || !channelId) {
    return NextResponse.json({ isLive: false, error: "Missing API credentials" }, { status: 500 });
  }

  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&type=video&eventType=live&key=${apiKey}`,
      { next: { revalidate: 60 } }
    );

    if (!res.ok) {
      const err = await res.json();
      console.error("YouTube API error (live):", err);
      return NextResponse.json({ isLive: false, error: "YouTube API error" }, { status: res.status });
    }

    const data = await res.json();
    const liveItem = data.items?.[0];

    if (liveItem) {
      return NextResponse.json(
        {
          isLive: true,
          videoId: liveItem.id.videoId,
          title: liveItem.snippet.title,
          thumbnail:
            liveItem.snippet.thumbnails?.high?.url ||
            liveItem.snippet.thumbnails?.default?.url ||
            "",
        },
        { headers: { "Cache-Control": "s-maxage=60, stale-while-revalidate=30" } }
      );
    }

    return NextResponse.json(
      { isLive: false },
      { headers: { "Cache-Control": "s-maxage=60, stale-while-revalidate=30" } }
    );
  } catch (err) {
    console.error("Error checking live status:", err);
    return NextResponse.json({ isLive: false, error: "Internal Server Error" }, { status: 500 });
  }
}

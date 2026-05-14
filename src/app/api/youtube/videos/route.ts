import { NextResponse } from "next/server";

export const revalidate = 300; // cache for 5 minutes

export async function GET() {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const playlistId = process.env.YOUTUBE_UPLOADS_PLAYLIST;

  if (!apiKey || !playlistId) {
    return NextResponse.json({ error: "Missing API credentials" }, { status: 500 });
  }

  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=${playlistId}&maxResults=6&key=${apiKey}`,
      { next: { revalidate: 300 } }
    );

    if (!res.ok) {
      const err = await res.json();
      console.error("YouTube API error (videos):", err);
      return NextResponse.json({ error: "YouTube API error", details: err }, { status: res.status });
    }

    const data = await res.json();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const videos = (data.items || []).map((item: any) => ({
      videoId: item.contentDetails.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      publishedAt: item.snippet.publishedAt,
      thumbnail:
        item.snippet.thumbnails?.maxres?.url ||
        item.snippet.thumbnails?.high?.url ||
        item.snippet.thumbnails?.medium?.url ||
        item.snippet.thumbnails?.default?.url ||
        "",
    }));

    return NextResponse.json({ videos }, { headers: { "Cache-Control": "s-maxage=300, stale-while-revalidate=60" } });
  } catch (err) {
    console.error("Error fetching YouTube videos:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

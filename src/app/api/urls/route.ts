import { dbConnect } from "@/app/lib/dbConnect";
import { NextResponse } from "next/server";
import Url from "@/app/model/model";

export async function GET() {
  await dbConnect();

  try {
    const urls = await Url.find({});
    const formattedUrls = urls.map(url => ({
      id: url._id,
      url: url.url,
      shortUrl: url.shortUrl,
    }));
    return NextResponse.json({ links: formattedUrls });
  } catch (err: any) {
    return NextResponse.json({ error: err.message });
  }
}
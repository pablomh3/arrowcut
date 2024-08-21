import { dbConnect } from "@/app/lib/dbConnect";
import Url from "@/app/model/model";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Record<string, any> }
) {
  await dbConnect();

  // Agrega el console.log aquí para verificar el valor de params
  console.log("Received params:", params);

  try {
    const urlDoc = await Url.findOne({ shortUrl: params.shortUrl });

    if (!urlDoc) {
      return NextResponse.redirect("/"); // Redirige a la página principal si no se encuentra el shortUrl
    }

    return NextResponse.redirect(urlDoc.url); // Redirige al URL original
  } catch (err: any) {
    console.error("Error in redirection:", err); // Log detallado del error
    return NextResponse.json({ error: err.message });
  }
}

import { dbConnect } from "@/app/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import Url from "@/app/model/model";

export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    // Extraer los datos del cuerpo de la solicitud
    const { url } = await request.json();

    // Verificar que el campo 'url' esté presente
    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    // Crear un nuevo documento de URL
    const newUrl = new Url({ url });

    // Guardar el documento en la base de datos
    const savedUrl = await newUrl.save();

    return NextResponse.json(savedUrl, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

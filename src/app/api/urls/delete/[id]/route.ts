import { dbConnect } from "@/app/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import Url from "@/app/model/model";

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();

  const { id } = params;

  try {
    const result = await Url.findByIdAndDelete(id);
    if (!result) {
      return NextResponse.json({ error: "URL not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "URL deleted successfully" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

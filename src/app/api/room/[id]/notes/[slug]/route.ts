import { NextRequest, NextResponse } from "next/server"
import NoteModel from "@/app/models/Note";

export async function PATCH(req: NextRequest, {
  params,
}: Readonly<{
  params: Promise<{ slug: string }>;
}>) {
  const data = await req.json();
  console.log(data)
  const { slug } = await params
  const note = await NoteModel.findByIdAndUpdate(slug, data)
  return NextResponse.json(note)
}
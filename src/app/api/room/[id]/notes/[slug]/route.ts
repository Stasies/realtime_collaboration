import { NextRequest, NextResponse } from "next/server"
import NoteModel from "@/app/models/Note"

export async function PATCH(req: NextRequest, {
  params,
}: Readonly<{
  params: Promise<{ id: string }>;
}>) {
  const data = await req.json();
  const { id } = await params
  const note = await NoteModel.findByIdAndUpdate(id, data)
  return NextResponse.json(note)
}
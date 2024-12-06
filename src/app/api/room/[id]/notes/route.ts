import NoteModel from "@/app/models/Note"
import RoomModel from "@/app/models/Room";
import { NextRequest, NextResponse } from "next/server"
export async function GET(req: NextRequest, {
  params,
}: Readonly<{
  params: Promise<{ id: string }>;
}>) {
  const { id } = await params
  const room = await RoomModel.findById(id)
  console.log(room)
  console.log(room.notes)
  return NextResponse.json(room.notes || [])
}
export async function POST(req: NextRequest) {

  const data = await req.json();
  const note = await new NoteModel(data)
  await note.save()
  console.log(note)
  const room = await RoomModel.findById(data.roomId)
  room.notes.push(note._id)
  room.save()
  console.log(room)
  return NextResponse.json(note)
}
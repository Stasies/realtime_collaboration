import NoteModel from "@/app/models/Note"
import RoomModel from "@/app/models/Room";
import { useSocket } from "@/hooks/socket";
import { NextRequest, NextResponse } from "next/server"
export async function GET(req: NextRequest, {
  params,
}: Readonly<{
  params: Promise<{ id: string }>;
}>) {
  const { id } = await params
  const room = await RoomModel.findById(id).populate('notes')
  if (!room) {
    return NextResponse.json({ error: 'Room not found' }, { status: 404 });
  } else {
    return NextResponse.json(room.notes)
  }
}
export async function POST(req: NextRequest, {
  params,
}: Readonly<{
  params: Promise<{ id: string }>;
}>) {
  console.log(io)
  const { id } = await params
  const data = await req.json();
  const note = await new NoteModel(data)
  await note.save()
  const room = await RoomModel.findByIdAndUpdate(id, { $push: { notes: note._id } }, // Adds note._id to the notes array
    { new: true })
  socket.emit('noteCreated')
  return NextResponse.json(note)
}
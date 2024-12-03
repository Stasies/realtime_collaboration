import NoteModel from "@/app/models/Note"
import connectDB from "@/config/database"
import { NextRequest, NextResponse } from "next/server"
export async function GET() {
  await connectDB()
  const notes = await NoteModel.find().select('-createdAt -updatedAt')
  return NextResponse.json(notes)
}
export async function POST(req: NextRequest) {
  const data = await req.json();
  const note = await new NoteModel(data)
  await note.save()
  return NextResponse.json(note)
}
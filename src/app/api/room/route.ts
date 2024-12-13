import RoomModel from "@/app/models/Room"
import { NextRequest, NextResponse } from "next/server"
export async function GET() {
  const rooms = await RoomModel.find().select('-createdAt -updatedAt')
  return NextResponse.json(rooms)
}
export async function POST(req: NextRequest) {
  const room = await new RoomModel()
  await room.save()
  return NextResponse.json(room)
}
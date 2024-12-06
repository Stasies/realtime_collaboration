import { NextRequest, NextResponse } from "next/server"
import RoomModel from "@/app/models/Room"

export async function GET(req: NextRequest, {
  params,
}: Readonly<{
  params: Promise<{ id: string }>;
}>) {
  const { id } = await params
  const room = await RoomModel.findById(id)
  console.log(room)
  return NextResponse.json(room)
}
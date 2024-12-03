
import TextModel from "@/app/models/Text"
import connectDB from "@/config/database"
import { NextRequest, NextResponse } from "next/server"
export async function GET() {
  await connectDB()
  const texts = await TextModel.find()
  return NextResponse.json(texts)
}
export async function POST(req: NextRequest) {
  const data = await req.json();
  const text = await new TextModel(data)
  await text.save()
  return NextResponse.json(text)
}
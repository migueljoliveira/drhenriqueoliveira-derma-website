import { type NextRequest, NextResponse } from "next/server"
import { getDictionary } from "@/dictionaries"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const lang = searchParams.get("lang") || "pt"

  try {
    const dictionary = await getDictionary(lang as string)
    return NextResponse.json(dictionary)
  } catch (error) {
    return NextResponse.json({ error: "Failed to load dictionary" }, { status: 500 })
  }
}

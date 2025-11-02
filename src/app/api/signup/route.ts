import { NextResponse } from "next/server";
import { apiUrl } from "../route";
export async function POST(req: Request) {
  const data = await req.json();

  const response = await fetch(`${apiUrl}/signup/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  return NextResponse.json(result, { status: response.status });
}

import { NextResponse } from "next/server";
import { apiUrl, jwtSecret } from "../route";

export async function POST(req: Request) {
  const data = await req.json();

  const response = await fetch(`${apiUrl}/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const result = await response.json();

  if (response.ok) {
    const res = NextResponse.json(result);
    res.cookies.set("access", result.access, { httpOnly: true });
    res.cookies.set("refresh", result.refresh, { httpOnly: true });
  }

  return NextResponse.json(result, { status: response.status });
}

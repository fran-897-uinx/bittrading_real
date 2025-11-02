import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
    const cookiescash = await cookies();
  const refresh = cookiescash.get("refresh")?.value;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/token/refresh/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh }),
  });

  const data = await res.json();
  if (res.ok) {
    const response = NextResponse.json(data);
    response.cookies.set("access", data.access, { httpOnly: true });
    return response;
  }
  return NextResponse.json(data, { status: res.status });
}

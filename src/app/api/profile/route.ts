import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookiescash = await cookies();
  const access = cookiescash.get("access")?.value;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile/`, {
    headers: {
      Authorization: `Bearer ${access}`,
    },
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}

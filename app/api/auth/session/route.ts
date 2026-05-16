import { NextResponse } from "next/server";
import { getServerSession } from "@/lib/auth/get-session";

export async function GET() {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ authenticated: false });
  }

  return NextResponse.json({
    authenticated: true,
    user: {
      userId: session.userId,
      username: session.username,
      role: session.role,
      email: session.email ?? null,
      permissions: session.permissions,
      expiresAt: session.expiresAt,
    },
  });
}

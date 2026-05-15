import { NextResponse } from "next/server";
import { env } from "@/lib/config/env";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { message: "Cuerpo JSON inválido" },
      { status: 400 }
    );
  }

  const url = `${env.auth.baseUrl.replace(/\/$/, "")}/auth/otp/login`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      return NextResponse.json(data, { status: res.status });
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { message: "No se pudo conectar con el servicio de autenticación" },
      { status: 502 }
    );
  }
}

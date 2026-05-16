import { NextResponse } from 'next/server';
import { env } from "@/lib/config/env";
import { AUTH_COOKIE_ACCESS, AUTH_COOKIE_REFRESH } from '@/lib/auth/constants';
import { cookieMaxAgeFromJwt } from '@/lib/auth/jwt';
import type { VerifyOtpBackendResponse } from '@/types/auth';

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: 'Cuerpo JSON inválido' }, { status: 400 });
  }

  const url = `${env.auth.baseUrl.replace(/\/$/, '')}/auth/otp/verify`;

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = (await res.json().catch(() => ({}))) as Partial<VerifyOtpBackendResponse> &
      Record<string, unknown>;

    if (!res.ok) {
      return NextResponse.json(data, { status: res.status });
    }

    const accessToken = data.access_token;
    const refreshToken = data.refresh_token;

    if (typeof accessToken !== 'string' || typeof refreshToken !== 'string') {
      return NextResponse.json(
        { message: 'Respuesta de auth incompleta' },
        { status: 502 }
      );
    }

    const publicPayload = {
      ok: true as const,
      message: typeof data.message === 'string' ? data.message : 'OK',
      user: {
        userId: String(data.userId ?? ''),
        email: String(data.email ?? ''),
        username: String(data.username ?? ''),
        role: String(data.role ?? ''),
        permissions: Array.isArray(data.permissions)
          ? data.permissions.map(String)
          : [],
      },
    };

    const response = NextResponse.json(publicPayload);

    const accessMaxAge = cookieMaxAgeFromJwt(accessToken);
    /** Refresh opaco: vigencia larga; el backend puede invalidarlo antes. */
    const refreshMaxAge = 60 * 60 * 24 * 30;

    response.cookies.set(AUTH_COOKIE_ACCESS, accessToken, {
      httpOnly: true,
      secure: env.isProduction,
      sameSite: 'lax',
      path: '/',
      maxAge: accessMaxAge,
    });

    response.cookies.set(AUTH_COOKIE_REFRESH, refreshToken, {
      httpOnly: true,
      secure: env.isProduction,
      sameSite: 'lax',
      path: '/',
      maxAge: refreshMaxAge,
    });

    return response;
  } catch {
    return NextResponse.json(
      { message: 'No se pudo conectar con el servicio de verificación' },
      { status: 502 }
    );
  }
}

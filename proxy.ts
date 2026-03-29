import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

let locales = ['en', 'es']
let defaultLocale = 'es'

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 1. Seguridad básica: bloquear acceso a rutas sensibles no autorizadas
  if (pathname.startsWith('/api/admin') && !request.headers.get('x-admin-token')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // 2. Manejo de multi-lenguaje (i18n)
  // No queremos aplicar i18n a las rutas de API ni a los archivos estáticos
  if (pathname.startsWith('/api') || pathname.includes('.')) {
    return NextResponse.next()
  }

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) {
    return NextResponse.next()
  }

  // Redireccionar si no hay locale
  const locale = defaultLocale
  request.nextUrl.pathname = `/${locale}${pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: [
    // Incluimos todo excepto archivos internos de Next.js y estáticos conocidos
    '/((?!_next|favicon.ico|globe.svg|window.svg|file.svg|next.svg|vercel.svg).*)',
  ],
}

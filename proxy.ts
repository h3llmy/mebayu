import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextResponse, NextRequest } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // Create a regex to match the dashboard path considering locale
  const isDashboardPath = /^\/(id|en)\/dashboard(\/.*)?$/.test(pathname) || /^\/dashboard(\/.*)?$/.test(pathname);

  if (isDashboardPath) {
    const token = req.cookies.get('access_token')?.value;

    // Determine the user's current locale or fallback to default
    const localeMatch = pathname.match(/^\/(id|en)/);
    const locale = localeMatch ? localeMatch[1] : routing.defaultLocale;
    const loginUrl = new URL(`/${locale}/login`, req.url);
    const homeUrl = new URL(`/${locale}`, req.url);

    if (!token) {
      return NextResponse.redirect(loginUrl);
    }

    try {
      // Decode JWT payload
      const payloadBase64 = token.split('.')[1];
      if (!payloadBase64) throw new Error("Invalid token");
      const payloadString = atob(payloadBase64);
      const payload = JSON.parse(payloadString);

      const role = (payload.role || payload.Role || payload.roles?.[0] || '').toLowerCase();

      if (role !== 'admin' && role !== 'administrator') {
        return NextResponse.redirect(homeUrl);
      }
    } catch {
      return NextResponse.redirect(loginUrl);
    }
  }

  // Continue with next-intl routing for other requests
  return intlMiddleware(req);
}

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(id|en)/:path*']
};

import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';
import { Locale } from '@/types';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: [Locale.EN, Locale.ID],

  // Used when no locale matches
  defaultLocale: Locale.EN
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);

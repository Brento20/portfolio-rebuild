import { profile } from "../data/profile";

/**
 * Public site URL with no trailing slash.
 * Set VITE_SITE_URL in production (see .env.example).
 */
const configuredSiteUrl = import.meta.env.VITE_SITE_URL?.replace(/\/$/, "") ?? "";

export const siteConfig = {
  siteName: `${profile.name} · ${profile.role}`,
  title: `${profile.name} · ${profile.role} · Sydney`,
  shortTitle: `${profile.name} · ${profile.role}`,
  description:
    "Senior Web Developer in Sydney — front-end systems, component libraries, technical SEO, and 200+ production websites. Portfolio featuring React, TypeScript, and a constellation-map project explorer.",
  locale: "en_AU",
  themeColor: "#0a0f1a",
  siteUrl: configuredSiteUrl,
  canonicalUrl: configuredSiteUrl ? `${configuredSiteUrl}/` : undefined,
  author: profile.name,
  email: profile.email,
  location: profile.location,
  twitterHandle: undefined as string | undefined,
  ogImagePath: "/og-image.svg",
  ogImageAlt: `${profile.name} — ${profile.role} portfolio`,
  keywords: [
    "Brenton Weaver",
    "Senior Web Developer",
    "Sydney web developer",
    "React developer",
    "TypeScript",
    "front-end developer",
    "component systems",
    "technical SEO",
    "Squarespace developer",
    profile.role,
  ],
  links: profile.links,
} as const;

export function absoluteUrl(path: string): string {
  if (!siteConfig.siteUrl) {
    return path;
  }

  return `${siteConfig.siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

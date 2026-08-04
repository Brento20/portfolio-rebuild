import { useEffect } from "react";
import { absoluteUrl, siteConfig } from "../../config/site";

/**
 * Keeps document metadata aligned with siteConfig when VITE_SITE_URL is set at build time.
 * Primary tags also exist in index.html for first paint and non-JS crawlers.
 */
export function SiteDocumentHead() {
  useEffect(() => {
    document.title = siteConfig.title;

    const setMeta = (
      selector: string,
      attribute: "content" | "href",
      value: string,
    ) => {
      const element = document.querySelector(selector);
      if (element && value) {
        element.setAttribute(attribute, value);
      }
    };

    setMeta('meta[name="description"]', "content", siteConfig.description);

    if (siteConfig.canonicalUrl) {
      setMeta('link[rel="canonical"]', "href", siteConfig.canonicalUrl);
      setMeta('meta[property="og:url"]', "content", siteConfig.canonicalUrl);
    }

    const ogImageUrl = absoluteUrl(siteConfig.ogImagePath);
    if (ogImageUrl.startsWith("http")) {
      setMeta('meta[property="og:image"]', "content", ogImageUrl);
      setMeta('meta[name="twitter:image"]', "content", ogImageUrl);
    }
  }, []);

  return null;
}

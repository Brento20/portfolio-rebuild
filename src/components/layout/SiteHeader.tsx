import { useEffect, useState } from "react";
import { profile } from "../../data/profile";

const navItems = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [solid, setSolid] = useState(false);
  const [inCosmos, setInCosmos] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setSolid(window.scrollY > 48);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const experience = document.getElementById("experience");
    if (!experience) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInCosmos(entry.isIntersecting && entry.intersectionRatio > 0.35);
      },
      { threshold: [0, 0.35, 0.6] },
    );

    observer.observe(experience);
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={[
        "site-header",
        solid ? "site-header--solid" : "",
        inCosmos ? "site-header--cosmos" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="site-header__inner">
        <a className="site-header__brand" href="#top">
          <span className="site-header__monogram" aria-hidden="true">
            BW
          </span>
          <span className="site-header__brand-text">
            {profile.name}
            <span>
              {profile.role} · {profile.roleDetail}
            </span>
          </span>
        </a>

        <nav aria-label="Primary">
          <ul className="site-nav">
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

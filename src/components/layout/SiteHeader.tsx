import { useEffect, useState } from "react";
import { profile } from "../../data/profile";

const navItems = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setSolid(window.scrollY > 48);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={["site-header", solid ? "site-header--solid" : ""]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="site-header__inner">
        <a className="site-header__brand" href="#top">
          {profile.name}
          <span>{profile.role}</span>
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

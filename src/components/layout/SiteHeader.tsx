import { profile } from "../../data/profile";

const navItems = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
] as const;

export function SiteHeader() {
  return (
    <header className="site-header site-header--solid">
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

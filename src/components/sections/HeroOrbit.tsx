export function HeroOrbit() {
  return (
    <div className="hero-orbit" aria-hidden="true">
      <svg
        className="hero-orbit__svg"
        viewBox="0 0 420 420"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className="hero-orbit__ring hero-orbit__ring--outer"
          cx="210"
          cy="210"
          r="188"
        />
        <circle
          className="hero-orbit__ring hero-orbit__ring--mid"
          cx="210"
          cy="210"
          r="132"
        />
        <circle
          className="hero-orbit__ring hero-orbit__ring--inner"
          cx="210"
          cy="210"
          r="76"
        />
        <circle className="hero-orbit__core" cx="210" cy="210" r="14" />
        <circle className="hero-orbit__node hero-orbit__node--a" cx="210" cy="22" r="5" />
        <circle className="hero-orbit__node hero-orbit__node--b" cx="368" cy="140" r="4" />
        <circle className="hero-orbit__node hero-orbit__node--c" cx="72" cy="300" r="4.5" />
        <circle className="hero-orbit__node hero-orbit__node--d" cx="320" cy="330" r="3.5" />
      </svg>
      <p className="hero-orbit__caption">
        <span>200+</span> production sites · component systems
      </p>
    </div>
  );
}

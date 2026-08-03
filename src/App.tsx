import { SiteHeader } from "./components/layout/SiteHeader";
import { Contact } from "./components/sections/Contact";
import { ExperienceSection } from "./components/sections/ExperienceSection";
import { Hero } from "./components/sections/Hero";
import { Intro } from "./components/sections/Intro";
import { SitePointerProvider } from "./context/SitePointerContext";
import { CursorGlow } from "./components/celestial/CursorGlow";
import { profile } from "./data/profile";

function App() {
  return (
    <SitePointerProvider>
      <CursorGlow />
      <SiteHeader />
      <main>
        <Hero />
        <Intro />
        <ExperienceSection />
        <Contact />
      </main>
      <footer className="site-footer">
        <span className="site-footer__mark" aria-hidden="true">
          BW
        </span>
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p className="site-footer__note">Sydney · Front-end systems design</p>
      </footer>
    </SitePointerProvider>
  );
}

export default App;

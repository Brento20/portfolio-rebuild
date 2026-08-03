import { SiteHeader } from "./components/layout/SiteHeader";
import { Contact } from "./components/sections/Contact";
import { ExperienceSection } from "./components/sections/ExperienceSection";
import { Hero } from "./components/sections/Hero";
import { Intro } from "./components/sections/Intro";
import { profile } from "./data/profile";

function App() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Intro />
        <ExperienceSection />
        <Contact />
      </main>
      <footer className="site-footer">
        © {new Date().getFullYear()} {profile.name}. Crafted in Sydney.
      </footer>
    </>
  );
}

export default App;

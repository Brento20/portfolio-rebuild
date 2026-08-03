import { CosmosBackground } from "./components/celestial/CosmosBackground";
import { Career } from "./components/sections/Career";
import { Contact } from "./components/sections/Contact";
import { ExperienceSection } from "./components/sections/ExperienceSection";
import { Hero } from "./components/sections/Hero";
import { Intro } from "./components/sections/Intro";
import { Toolkit } from "./components/sections/Toolkit";
import { profile } from "./data/profile";

function App() {
  return (
    <>
      <CosmosBackground />
      <main>
        <Hero />
        <Intro />
        <ExperienceSection />
        <Career />
        <Toolkit />
        <Contact />
      </main>
      <footer className="site-footer">
        <p>
          © {new Date().getFullYear()} {profile.name} · Sydney
        </p>
      </footer>
    </>
  );
}

export default App;

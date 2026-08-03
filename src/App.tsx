import { CosmosBackground } from "./components/celestial/CosmosBackground";
import { Contact } from "./components/sections/Contact";
import { ExperienceSection } from "./components/sections/ExperienceSection";
import { Hero } from "./components/sections/Hero";
import { Intro } from "./components/sections/Intro";
import { profile } from "./data/profile";

function App() {
  return (
    <>
      <CosmosBackground />
      <main>
        <Hero />
        <Intro />
        <ExperienceSection />
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

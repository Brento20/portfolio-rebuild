import { Approach } from "../celestial/Approach";
import { profile } from "../../data/profile";
import { SectionHead } from "../layout/SectionHead";

export function Contact() {
  return (
    <section
      className="section contact"
      id="contact"
      aria-labelledby="contact-title"
    >
      <div className="section__inner contact__inner">
        <Approach>
          <div className="contact__beacon" aria-hidden="true">
            <span className="contact__beacon-core" />
            <span className="contact__beacon-ring contact__beacon-ring--one" />
            <span className="contact__beacon-ring contact__beacon-ring--two" />
          </div>

          <SectionHead
            title="Send a signal"
            subtitle="always happy to talk shop, roles or wild ideas"
            titleId="contact-title"
            align="center"
            lede={<p>{profile.contactLead}</p>}
            className="contact__head"
          />

          <a className="contact__email" href={profile.links.email}>
            {profile.email}
          </a>

          <div className="contact__meta">
            <a href={profile.links.phone}>{profile.phone}</a>
            <span className="contact__meta-dot" aria-hidden="true" />
            <a href={profile.links.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <span className="contact__meta-dot" aria-hidden="true" />
            <a href={profile.links.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <span className="contact__meta-dot" aria-hidden="true" />
            <a href={profile.links.resume} download>
              Résumé
            </a>
          </div>
        </Approach>
      </div>
    </section>
  );
}

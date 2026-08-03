import { motion, useReducedMotion } from "framer-motion";
import { profile } from "../../data/profile";
import { SectionHead } from "../layout/SectionHead";

const enterEase = [0.22, 1, 0.36, 1] as const;

export function Contact() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="section contact"
      id="contact"
      aria-labelledby="contact-title"
    >
      <div className="section__inner contact__inner">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.85, ease: enterEase }}
        >
          <div className="contact__beacon" aria-hidden="true">
            <span className="contact__beacon-core" />
            <span className="contact__beacon-ring contact__beacon-ring--one" />
            <span className="contact__beacon-ring contact__beacon-ring--two" />
          </div>

          <SectionHead
            eyebrow="Contact"
            title="Send a signal"
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
        </motion.div>
      </div>
    </section>
  );
}

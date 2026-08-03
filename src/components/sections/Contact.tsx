import { motion, useReducedMotion } from "framer-motion";
import { CosmicDawn } from "../celestial/CosmicDawn";
import { profile } from "../../data/profile";
import { SectionHead } from "../layout/SectionHead";

const enterEase = [0.22, 1, 0.36, 1] as const;

export function Contact() {
  const reduceMotion = useReducedMotion();

  return (
    <>
      <CosmicDawn />
      <section className="section contact" id="contact" aria-labelledby="contact-title">
      <div className="section__inner">
        <motion.div
          className="contact__layout"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: enterEase }}
        >
          <SectionHead
            index="03"
            eyebrow="Contact"
            title="Let's talk about your next site or role"
            titleId="contact-title"
            lede={<p>{profile.contactLead}</p>}
            className="contact__head"
          />

          <div className="contact__panel">
            <div className="contact__panel-accent" aria-hidden="true" />

            <div className="contact__grid">
              <div className="contact__primary">
                <span className="contact__label">Email</span>
                <a className="contact__email" href={profile.links.email}>
                  {profile.email}
                </a>
              </div>

              <div className="contact__links">
                <div className="contact__link-row">
                  <span>Phone</span>
                  <a href={profile.links.phone}>{profile.phone}</a>
                </div>
                <div className="contact__link-row">
                  <span>LinkedIn</span>
                  <a
                    href={profile.links.linkedin}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Brenton Weaver
                  </a>
                </div>
                <div className="contact__link-row">
                  <span>GitHub</span>
                  <a
                    href={profile.links.github}
                    target="_blank"
                    rel="noreferrer"
                  >
                    @Brento20
                  </a>
                </div>
              </div>

              <div className="contact__actions">
                <a className="btn btn--primary" href={profile.links.email}>
                  Send an email
                  <span className="btn__arrow" aria-hidden="true">
                    →
                  </span>
                </a>
                <a
                  className="btn btn--ghost"
                  href={profile.links.resume}
                  download
                >
                  Download résumé
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      </section>
    </>
  );
}

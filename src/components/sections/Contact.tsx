import { motion, useReducedMotion } from "framer-motion";
import { profile } from "../../data/profile";

const enterEase = [0.22, 1, 0.36, 1] as const;

export function Contact() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="section contact" id="contact" aria-labelledby="contact-title">
      <div className="section__inner">
        <motion.div
          className="contact__panel"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: enterEase }}
        >
          <div className="contact__grid">
            <div>
              <p className="section__eyebrow">Contact</p>
              <h2 className="section__title" id="contact-title">
                Let&apos;s talk about your next site or product
              </h2>
              <p className="section__lede">
                Open to freelance collaborations, full-time opportunities, and
                conversations about front-end work, SEO, and thoughtful
                implementation.
              </p>
            </div>

            <div className="contact__links">
              <div className="contact__link-row">
                <span>Email</span>
                <a href={profile.links.email}>{profile.email}</a>
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
                <a href={profile.links.github} target="_blank" rel="noreferrer">
                  @Brento20
                </a>
              </div>
              <a className="btn btn--primary" href={profile.links.email}>
                Send an email
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

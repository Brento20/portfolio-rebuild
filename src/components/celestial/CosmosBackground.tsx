import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { Starfield } from "../constellation/Starfield";

/*
  One continuous night sky behind the whole page.

  Layer scale is driven by page scroll: nearer layers grow faster
  than distant ones, so scrolling reads as travelling forward
  through the field rather than panning across a flat image.
*/
export function CosmosBackground() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 46,
    damping: 24,
    mass: 0.4,
  });

  const farScale = useTransform(progress, [0, 1], [1, 1.18]);
  const nearScale = useTransform(progress, [0, 1], [1, 1.55]);
  const nebulaScale = useTransform(progress, [0, 1], [1, 1.3]);
  const nearOpacity = useTransform(progress, [0, 0.5, 1], [0.9, 1, 0.95]);

  return (
    <div className="cosmos" aria-hidden="true">
      <motion.div
        className="cosmos__nebula-wrap"
        style={reduceMotion ? undefined : { scale: nebulaScale }}
      >
        <div className="cosmos__nebula cosmos__nebula--warm" />
        <div className="cosmos__nebula cosmos__nebula--cool" />
      </motion.div>

      <motion.div
        className="cosmos__stars cosmos__stars--far"
        style={reduceMotion ? undefined : { scale: farScale }}
      >
        <Starfield count={220} />
      </motion.div>

      <motion.div
        className="cosmos__stars cosmos__stars--near"
        style={
          reduceMotion ? undefined : { scale: nearScale, opacity: nearOpacity }
        }
      >
        <Starfield count={90} />
      </motion.div>
    </div>
  );
}

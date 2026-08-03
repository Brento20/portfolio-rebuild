import { Starfield } from "../constellation/Starfield";

/*
  One continuous night sky behind the whole page.

  Fixed layers mean no seams or re-renders between sections —
  scrolling reads as drifting through the same field of stars.
*/
export function CosmosBackground() {
  return (
    <div className="cosmos" aria-hidden="true">
      <div className="cosmos__nebula cosmos__nebula--warm" />
      <div className="cosmos__nebula cosmos__nebula--cool" />
      <div className="cosmos__stars cosmos__stars--far">
        <Starfield count={220} />
      </div>
      <div className="cosmos__stars cosmos__stars--near">
        <Starfield count={90} />
      </div>
    </div>
  );
}

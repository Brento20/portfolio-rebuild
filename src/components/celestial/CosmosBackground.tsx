import { lazy, Suspense } from "react";

const CosmosScene = lazy(() =>
  import("./CosmosScene").then((m) => ({ default: m.CosmosScene })),
);

/*
  One continuous night sky behind the whole page — a real 3D field
  the camera travels through as you scroll, washed by CSS nebulas.
  The three.js scene is code-split so first paint stays light.
*/
export function CosmosBackground() {
  return (
    <div className="cosmos" aria-hidden="true">
      <Suspense fallback={null}>
        <CosmosScene />
      </Suspense>
      <div className="cosmos__nebula cosmos__nebula--warm" />
      <div className="cosmos__nebula cosmos__nebula--cool" />
    </div>
  );
}

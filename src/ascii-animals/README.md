# ascii-animals (vendored)

Engine, renderer and the koi from https://github.com/DesignerStephen1/ascii-animals, MIT licensed (see LICENSE).

Changes from upstream:
- `animals/index.ts` lists only the koi.
- `engine.ts` has a public `poke(x, y)` so taps on the page (not just the canvas) can feed the koi,
  the default animal is koi, and the constructor no longer uses a parameter property.

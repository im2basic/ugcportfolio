import type { Animal } from "../flock";
import { koi } from "./koi";

/**
 * Only the koi are bundled for now. To add another animal, copy its file from
 * https://github.com/DesignerStephen1/ascii-animals (src/animals) and list it here.
 */
export const ANIMALS = {
  koi,
} satisfies Record<string, Animal<any>>;

export type AnimalKey = keyof typeof ANIMALS;

export const ANIMAL_KEYS = Object.keys(ANIMALS) as AnimalKey[];

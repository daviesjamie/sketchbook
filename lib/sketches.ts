import fs from "fs";
import { join } from "path";
import Sketch from "types/Sketch";

const sketchDirectory = join(process.cwd(), "sketches");

export function getAllSketchSlugs(): string[] {
  return fs
    .readdirSync(sketchDirectory)
    .map((filename) => filename.replace(/\.tsx/, ""));
}

export async function getSketchByFilename(slug: string): Promise<Sketch> {
  const sketch = await import(`sketches/${slug}`)
    .then((module) => module.metadata)
    .catch(() => null);

  return sketch;
}

export async function getAllSketches(): Promise<Sketch[]> {
  const filenames = getAllSketchSlugs();
  const sketches = filenames.map(async (filename: string) =>
    getSketchByFilename(filename)
  );
  return await Promise.all(sketches).then((sketches) =>
    sketches.sort((sketch1, sketch2) => (sketch1.date > sketch2.date ? -1 : 1))
  );
}

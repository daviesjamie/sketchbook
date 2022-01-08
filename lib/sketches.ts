import fs from "fs";
import { join } from "path";
import Sketch from "types/Sketch";
import SketchMetadata from "types/SketchMetadata";

const sketchDirectory = join(process.cwd(), "sketches");

export function getAllSketchSlugs(): string[] {
  return fs
    .readdirSync(sketchDirectory)
    .map((filename) => filename.replace(/\.tsx/, ""));
}

export async function getSketchBySlug(slug: string): Promise<Sketch> {
  const sketch: SketchMetadata = await import(`sketches/${slug}`)
    .then((module) => module.metadata)
    .catch(() => null);

  return {
    slug,
    ...sketch,
  };
}

export async function getAllSketches(): Promise<Sketch[]> {
  const slugs = getAllSketchSlugs();
  const sketches = slugs.map(async (slug: string) => getSketchBySlug(slug));

  return await Promise.all(sketches).then((sketches) =>
    sketches.sort((a, b) => Date.parse(a.date) - Date.parse(b.date))
  );
}

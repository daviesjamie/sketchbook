import Sketch from "types/Sketch";

interface Props {
  sketch: Sketch;
}

const SketchLink = ({ sketch }: Props) => (
  <a href={`/${sketch.slug}`} className="group">
    <span className="text-zinc-600 group-hover:text-zinc-500 group-focus:text-zinc-400">
      {sketch.slug}
      {"."}
    </span>{" "}
    <span className="relative group-hover:after:bg-zinc-400 group-hover:after:-bottom-0.5 group-hover:after:h-px group-hover:after:absolute group-hover:after:left-0 group-hover:after:right-0">
      {sketch.title}
    </span>
  </a>
);

export default SketchLink;

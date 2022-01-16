import type { GetStaticProps, NextPage } from "next";
import SketchLink from "components/SketchLink";
import { getAllSketches } from "lib/sketches";
import Sketch from "types/Sketch";

interface Props {
  sketches: Sketch[];
}

const Home: NextPage<Props> = ({ sketches }: Props) => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="max-w-3xl p-4">
        <h1 className="text-2xl mb-10">Sketches</h1>
        <ul>
          {sketches.map((sketch) => (
            <li key={sketch.slug}>
              <SketchLink sketch={sketch} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      sketches: await getAllSketches(),
    },
  };
};

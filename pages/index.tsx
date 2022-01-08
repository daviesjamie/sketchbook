import type { GetStaticProps, NextPage } from "next";
import { getAllSketches } from "lib/sketches";
import Sketch from "types/Sketch";

interface Props {
  sketches: Sketch[];
}

const Home: NextPage<Props> = ({ sketches }: Props) => {
  return (
    <>
      <h1>Sketchbook</h1>
      <ul>
        {sketches.map((sketch) => (
          <li key={sketch.slug}>
            {sketch.slug} | {sketch.title} | {sketch.date}
          </li>
        ))}
      </ul>
    </>
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

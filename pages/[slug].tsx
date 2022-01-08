import { ErrorBoundary } from "components/ErrorBoundary";
import { getAllSketchSlugs } from "lib/sketches";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { ParsedUrlQuery } from "querystring";
import { lazy, Suspense, useEffect, useState } from "react";
import SketchMetadata from "types/SketchMetadata";

interface Props {
  slug: string;
  title: string;
}

const SketchPage = ({ slug, title }: Props) => {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => setHasMounted(true), []);

  const Sketch = lazy(() => import(`sketches/${slug}`));

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      {hasMounted && (
        <ErrorBoundary fallback={"Error"}>
          <Suspense fallback={"Loading"}>
            <Sketch />
          </Suspense>
        </ErrorBoundary>
      )}
    </>
  );
};

export default SketchPage;

interface Params extends ParsedUrlQuery {
  slug: string;
}

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const { slug } = params!;

  if (!slug) {
    return { notFound: true };
  }

  const { title }: SketchMetadata = await import(`sketches/${slug}`)
    .then((module) => module.metadata)
    .catch(() => null);

  return {
    props: {
      slug,
      title,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = getAllSketchSlugs();
  const paths = slugs.map((slug) => ({ params: { slug } }));
  return { paths, fallback: false };
};

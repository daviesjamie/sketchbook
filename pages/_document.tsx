import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body className="bg-zinc-900 text-zinc-200 font-mono font-light">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

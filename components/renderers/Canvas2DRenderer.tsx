import { useEffect, useRef } from "react";

interface Props {
  setup: (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => void;
}

const Canvas2DRenderer = ({ setup }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!canvas || !ctx) {
      return;
    }

    setup(canvas, ctx);
  });

  return <canvas ref={canvasRef} />;
};

export default Canvas2DRenderer;

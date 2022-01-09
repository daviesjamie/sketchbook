import { useEffect, useRef } from "react";

export interface Canvas2DSetupProps {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
}

interface Canvas2DRendererProps {
  setup: (props: Canvas2DSetupProps) => void;
}

const Canvas2DRenderer = ({ setup }: Canvas2DRendererProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!canvas || !ctx) {
      return;
    }

    setup({ canvas, ctx });
  });

  return <canvas ref={canvasRef} />;
};

export default Canvas2DRenderer;

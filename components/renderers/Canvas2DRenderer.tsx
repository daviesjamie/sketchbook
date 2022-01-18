import { useEffect, useRef } from "react";
import { Pane } from "tweakpane";

import fixCanvasPixelRatio from "lib/fixCanvasPixelRatio";

export interface Canvas2DSetupProps {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  height: number;
  panel: Pane;
  width: number;
}

interface Canvas2DRendererProps {
  dimensions?: [number, number];
  setup: (props: Canvas2DSetupProps) => void;
}

const Canvas2DRenderer = ({ dimensions, setup }: Canvas2DRendererProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [width, height] = dimensions ?? [window.innerWidth, window.innerHeight];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!canvas || !ctx) {
      return;
    }

    const panel = new Pane({ title: "Parameters" });

    fixCanvasPixelRatio(canvas, ctx);
    ctx.clearRect(0, 0, width, height);

    setup({ canvas, ctx, height, panel, width });
  });

  return <canvas ref={canvasRef} width={width} height={height} />;
};

export default Canvas2DRenderer;

import { useEffect, useRef } from "react";
import { Pane } from "tweakpane";

import fixCanvasPixelRatio from "lib/fixCanvasPixelRatio";

export interface Canvas2DSetupProps {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  height: number;
  width: number;
}

export interface PaneSetupProps {
  pane: Pane;
}

interface Canvas2DRendererProps {
  dimensions?: [number, number];
  paneSetup: (props: PaneSetupProps) => void;
  setup: (props: Canvas2DSetupProps) => void;
}

const Canvas2DRenderer = ({
  dimensions,
  paneSetup,
  setup,
}: Canvas2DRendererProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [width, height] = dimensions ?? [window.innerWidth, window.innerHeight];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!canvas || !ctx) {
      return;
    }

    const draw = () => {
      fixCanvasPixelRatio(canvas, ctx);
      ctx.clearRect(0, 0, width, height);

      setup({ canvas, ctx, height, width });
    };

    draw();

    const pane = new Pane({ title: "Parameters" });
    paneSetup({ pane });

    const redrawBtn = pane.addButton({ title: "Redraw" });
    redrawBtn.on("click", draw);
  });

  return <canvas ref={canvasRef} width={width} height={height} />;
};

export default Canvas2DRenderer;

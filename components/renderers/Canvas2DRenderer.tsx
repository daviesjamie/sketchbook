import { useEffect, useRef } from "react";

export interface Canvas2DSetupProps {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  height: number;
  width: number;
}

interface Canvas2DRendererProps {
  dimensions?: [number, number];
  setup: (props: Canvas2DSetupProps) => void;
}

const fixCanvasPixelRatio = (
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D
) => {
  const scale = window?.devicePixelRatio ?? 1;
  const { width, height } = canvas.getBoundingClientRect();

  // CSS pixels shouldn't be scaled
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  // The size of the canvas in physical pixels needs to be scaled for Hi-DPI screens
  // https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio
  canvas.width = width * scale;
  canvas.height = height * scale;

  ctx.scale(scale, scale);
};

const Canvas2DRenderer = ({ dimensions, setup }: Canvas2DRendererProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [width, height] = dimensions ?? [window.innerWidth, window.innerHeight];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!canvas || !ctx) {
      return;
    }

    fixCanvasPixelRatio(canvas, ctx);
    setup({ canvas, ctx, height, width });
  });

  return <canvas ref={canvasRef} width={width} height={height} />;
};

export default Canvas2DRenderer;

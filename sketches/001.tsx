import { useEffect, useRef } from "react";
import SketchMetadata from "../types/SketchMetadata";

const Sketch = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (!canvas || !context) {
      return;
    }

    const size = 320;
    const dpr = window.devicePixelRatio;
    const step = 20;

    canvas.width = size * dpr;
    canvas.height = size * dpr;
    context.scale(dpr, dpr);

    context.lineCap = "square";
    context.lineWidth = 2;

    const draw = (x: number, y: number, width: number, height: number) => {
      const leftToRight = Math.random() >= 0.5;

      if (leftToRight) {
        context.moveTo(x, y);
        context.lineTo(x + width, y + height);
      } else {
        context.moveTo(x + width, y);
        context.lineTo(x, y + height);
      }

      context.stroke();
    };

    for (let x = 0; x < size; x += step) {
      for (let y = 0; y < size; y += step) {
        draw(x, y, step, step);
      }
    }
  });

  return <canvas ref={canvasRef} />;
};

export default Sketch;

const metadata: SketchMetadata = {
  title: "10 PRINT",
  date: "2022-01-09",
};

export { metadata };

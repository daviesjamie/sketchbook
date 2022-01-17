import Canvas2DRenderer, {
  Canvas2DSetupProps,
} from "components/renderers/Canvas2DRenderer";
import SketchMetadata from "types/SketchMetadata";

const Sketch = () => {
  const bgColour = "rgb(24, 24, 27)";
  const fgColour = "rgb(228, 228, 231)";

  const setup = ({ canvas, ctx, width, height }: Canvas2DSetupProps) => {
    ctx.fillStyle = bgColour;
    ctx.fillRect(0, 0, width, height);

    const step = 20;

    ctx.lineCap = "square";
    ctx.lineWidth = 2;
    ctx.strokeStyle = fgColour;

    const drawLine = (x: number, y: number, width: number, height: number) => {
      const leftToRight = Math.random() >= 0.5;

      if (leftToRight) {
        ctx.moveTo(x, y);
        ctx.lineTo(x + width, y + height);
      } else {
        ctx.moveTo(x + width, y);
        ctx.lineTo(x, y + height);
      }

      ctx.stroke();
    };

    for (let x = 0; x < width; x += step) {
      for (let y = 0; y < height; y += step) {
        drawLine(x, y, step, step);
      }
    }
  };

  return <Canvas2DRenderer setup={setup} />;
};

export default Sketch;

const metadata: SketchMetadata = {
  title: "10 PRINT",
  date: "2022-01-09",
};

export { metadata };

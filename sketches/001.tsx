import Canvas2DRenderer, {
  Canvas2DSetupProps,
  PaneSetupProps,
} from "components/renderers/Canvas2DRenderer";
import SketchMetadata from "types/SketchMetadata";

const Sketch = () => {
  const params = {
    bgColour: "rgb(24, 24, 27)",
    fgColour: "rgb(113, 113, 122)",
    step: 30,
  };

  const paneSetup = ({ pane }: PaneSetupProps) => {
    pane.addInput(params, "bgColour", { label: "bg colour" });
    pane.addInput(params, "fgColour", { label: "fg colour" });
    pane.addInput(params, "step", {
      min: 5,
      max: 100,
      step: 5,
      label: "grid size",
    });
  };

  const setup = ({ ctx, width, height }: Canvas2DSetupProps) => {
    ctx.fillStyle = params.bgColour;
    ctx.fillRect(0, 0, width, height);

    ctx.lineCap = "square";
    ctx.lineWidth = 2;
    ctx.strokeStyle = params.fgColour;

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

    for (let x = 0; x < width; x += params.step) {
      for (let y = 0; y < height; y += params.step) {
        drawLine(x, y, params.step, params.step);
      }
    }
  };

  return <Canvas2DRenderer paneSetup={paneSetup} setup={setup} />;
};

export default Sketch;

const metadata: SketchMetadata = {
  title: "10 PRINT",
  date: "2022-01-09",
};

export { metadata };

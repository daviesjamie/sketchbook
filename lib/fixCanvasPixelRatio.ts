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

export default fixCanvasPixelRatio;

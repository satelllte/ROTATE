const CANVAS_WIDTH = 504;
const CANVAS_HEIGHT = 504;
const COLOR = {
  background: {
    hexNum: 0x202020,
    hexString: '#202020',
  },
} as const satisfies Record<
  string,
  {
    hexNum: number;
    hexString: string;
  }
>;

const container = document.getElementById('game');
if (!container) throw new Error('No #game container element present');

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d', {alpha: false});
if (!ctx) throw new Error('Could not get CanvasRenderingContext2D');

ctx.imageSmoothingEnabled = false;
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
canvas.style.position = 'absolute';
canvas.style.left = '0';
canvas.style.top = '0';
canvas.style.transform = 'translateZ(0px)';
canvas.style.cursor = 'default';
container.appendChild(canvas);

const loop: FrameRequestCallback = () => {
  ctx.fillStyle = COLOR.background.hexString;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  requestAnimationFrame(loop);
};

requestAnimationFrame(loop);

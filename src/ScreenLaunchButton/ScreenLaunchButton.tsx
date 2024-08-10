import {useEffect} from 'react';
import {ASSETS} from '../constants';
import {useCanvasCtx} from '../Canvas';
import {clearCanvas} from '../Canvas/utils';
import {useImage} from '../hooks/useImage';

export function ScreenLaunchButton() {
  const ctx = useCanvasCtx();
  const image = useImage(ASSETS.img.start);
  if (!image) return null;

  return (
    <>
      <Graphics ctx={ctx} image={image} />
      <Interaction ctx={ctx} image={image} />
    </>
  );
}

function Graphics({
  ctx,
  image,
}: {
  readonly ctx: CanvasRenderingContext2D;
  readonly image: HTMLImageElement;
}) {
  useEffect(() => {
    ctx.drawImage(
      image,
      ctx.canvas.width * 0.5 - image.width * 0.5,
      ctx.canvas.height * 0.5 - image.height * 0.5,
    );

    return () => {
      clearCanvas(ctx);
    };
  }, [ctx, image]);

  return null;
}

function Interaction({
  ctx,
  image,
}: {
  readonly ctx: CanvasRenderingContext2D;
  readonly image: HTMLImageElement;
}) {
  useEffect(() => {
    const {canvas} = ctx;

    const onPointerMove = (event: PointerEvent) => {
      const {x, y} = getXYOnCanvas(canvas, event);
      const isOverButton = calcIsOverButton(canvas, image, x, y);
      console.debug('[onPointerMove] isOverButton: ', isOverButton);
    };

    canvas.addEventListener('pointermove', onPointerMove);

    return () => {
      canvas.removeEventListener('pointermove', onPointerMove);
    };
  }, [ctx, image]);

  return null;
}

const getXYOnCanvas = (canvas: HTMLCanvasElement, event: PointerEvent) => {
  const canvasRect = canvas.getBoundingClientRect();
  const x = event.x - canvasRect.x;
  const y = event.y - canvasRect.y;
  return {x, y};
};

const calcIsOverButton = (
  canvas: HTMLCanvasElement,
  image: HTMLImageElement,
  x: number,
  y: number,
): boolean => {
  const xMin = canvas.width * 0.5 - image.width * 0.5;
  const xMax = xMin + image.width;
  const yMin = canvas.height * 0.5 - image.height * 0.5;
  const yMax = yMin + image.height;
  return x >= xMin && x <= xMax && y >= yMin && y <= yMax;
};

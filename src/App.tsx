import {Container} from './Container';
import {Canvas, useCanvasCtx} from './Canvas';
import {useEffect, useState} from 'react';
import {ASSETS} from './constants';
import {useImage} from './hooks/useImage';
import {useInterval} from './hooks/useInterval';

export function App() {
  return (
    <Container>
      <Canvas>
        <Screens />
      </Canvas>
    </Container>
  );
}

function Screens() {
  const [shouldRender, setShouldRender] = useState(true);

  // for debugging
  useInterval(() => {
    setShouldRender((x) => !x);
  }, 1000 + 990000);

  if (!shouldRender) return null;

  return <ScreenLaunchButton />;
}

function ScreenLaunchButton() {
  const ctx = useCanvasCtx();
  const image = useImage(ASSETS.img.start);

  useEffect(() => {
    if (!image) return;

    ctx.drawImage(
      image,
      ctx.canvas.width * 0.5 - image.width * 0.5,
      ctx.canvas.height * 0.5 - image.height * 0.5,
    );

    return () => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    };
  }, [ctx, image]);

  useEffect(() => {
    if (!image) return;

    const getXYOnCanvas = (event: PointerEvent) => {
      const canvasRect = ctx.canvas.getBoundingClientRect();
      const x = event.x - canvasRect.x;
      const y = event.y - canvasRect.y;
      return {x, y};
    };

    const calcIsOverButton = (
      image: HTMLImageElement,
      x: number,
      y: number,
    ): boolean => {
      const xMin = ctx.canvas.width * 0.5 - image.width * 0.5;
      const xMax = xMin + image.width;
      const yMin = ctx.canvas.height * 0.5 - image.height * 0.5;
      const yMax = yMin + image.height;
      return x >= xMin && x <= xMax && y >= yMin && y <= yMax;
    };

    const onPointerMove = (event: PointerEvent) => {
      const {x, y} = getXYOnCanvas(event);
      const isOverButton = calcIsOverButton(image, x, y);
      console.debug('[onPointerMove] isOverButton: ', isOverButton);
    };

    ctx.canvas.addEventListener('pointermove', onPointerMove);

    return () => {
      ctx.canvas.removeEventListener('pointermove', onPointerMove);
    };
  }, [ctx, image]);

  return null;
}

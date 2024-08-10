import {Container} from './Container';
import {CanvasRoot, useCanvasCtx} from './CanvasRoot';
import {useEffect, useState} from 'react';
import {ASSETS} from './constants';
import {useImage} from './hooks/useImage';
import {useInterval} from './hooks/useInterval';

export function App() {
  return (
    <Container>
      <CanvasRoot>
        <MainView />
      </CanvasRoot>
    </Container>
  );
}

function MainView() {
  const [shouldRender, setShouldRender] = useState(true);

  useInterval(() => {
    setShouldRender((x) => !x);
  }, 1000);

  if (!shouldRender) return null;

  return <Screen />;
}

function Screen() {
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

  return null;
}

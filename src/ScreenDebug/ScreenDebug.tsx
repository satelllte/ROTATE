import {useEffect} from 'react';
import {useCanvasCtx} from '../Canvas';
import {degToRad} from '../utils/math';
import {clearCanvas} from '../Canvas/utils';

export function ScreenDebug() {
  const ctx = useCanvasCtx();

  return (
    <>
      <Graphics ctx={ctx} />
    </>
  );
}

function Graphics({ctx}: {readonly ctx: CanvasRenderingContext2D}) {
  useEffect(() => {
    ctx.beginPath();
    ctx.arc(
      ctx.canvas.width * 0.25,
      ctx.canvas.height * 0.25,
      50,
      degToRad(0.0),
      degToRad(360.0),
    );
    ctx.stroke();

    return () => {
      clearCanvas(ctx);
    };
  }, [ctx]);

  return null;
}

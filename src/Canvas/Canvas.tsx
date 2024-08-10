import {createContext, useContext, useEffect, useRef, useState} from 'react';

const CanvasContext = createContext<CanvasRenderingContext2D | undefined>(
  undefined,
);

type CanvasProps = {
  readonly children: React.ReactNode;
};

export function Canvas({children}: CanvasProps) {
  const canvasRef = useRef<React.ElementRef<'canvas'>>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | undefined>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setCtx(ctx);
  }, []);

  return (
    <CanvasContext.Provider value={ctx}>
      <canvas
        ref={canvasRef}
        width={504}
        height={504}
        style={{
          maxWidth: '100%',
          maxHeight: '100%',
          border: '1px solid black',
        }}
      />
      {ctx && children}
    </CanvasContext.Provider>
  );
}

export const useCanvasCtx = (): CanvasRenderingContext2D => {
  const ctx = useContext(CanvasContext);
  if (!ctx)
    throw new Error("Trying to access canvas context before it's available");

  return ctx;
};

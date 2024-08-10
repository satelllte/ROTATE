import {createContext, useContext, useEffect, useRef, useState} from 'react';

const CanvasRootContext = createContext<CanvasRenderingContext2D | undefined>(
  undefined,
);

type CanvasRootProps = {
  readonly children: React.ReactNode;
};

export function CanvasRoot({children}: CanvasRootProps) {
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
    <CanvasRootContext.Provider value={ctx}>
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
    </CanvasRootContext.Provider>
  );
}

export const useCanvasCtx = (): CanvasRenderingContext2D => {
  const ctx = useContext(CanvasRootContext);
  if (!ctx)
    throw new Error("Trying to access canvas context before it's available");

  return ctx;
};

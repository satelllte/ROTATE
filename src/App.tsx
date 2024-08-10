import {useState} from 'react';
import {Container} from './Container';
import {Canvas} from './Canvas';
import {ScreenLaunchButton} from './ScreenLaunchButton';
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

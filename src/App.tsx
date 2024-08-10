import {useState} from 'react';
import {Container} from './Container';
import {Canvas} from './Canvas';
import {ScreenDebug} from './ScreenDebug';
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
  const [debug, setDebug] = useState(false);

  useInterval(() => {
    setDebug((x) => !x);
  }, 2000);

  if (debug) return <ScreenDebug />;

  return <ScreenLaunchButton />;
}

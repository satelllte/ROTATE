import {useEffect} from 'react';
import {useEffectEvent} from './useEffectEvent';

export const useInterval = (
  callback: () => void,
  delay: number | undefined,
): void => {
  const _callback = useEffectEvent(callback);

  useEffect(() => {
    // Don't schedule if no delay is specified.
    // Note: 0 is still a valid value for it.
    if (delay === undefined) return;

    const intervalId = setInterval(() => {
      _callback();
    }, delay);

    return () => {
      clearInterval(intervalId);
    };
  }, [_callback, delay]);
};

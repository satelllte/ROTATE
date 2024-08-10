import {useEffect} from 'react';
import {useEffectEvent} from './useEffectEvent';

export const useTimeout = (
  callback: () => void,
  delay: number | undefined,
): void => {
  const _callback = useEffectEvent(callback);

  useEffect(() => {
    // Don't schedule if no delay is specified.
    // Note: 0 is still a valid value for it.
    if (delay === undefined) return;

    const timeoutId = setTimeout(() => {
      _callback();
    }, delay);

    return () => {
      clearInterval(timeoutId);
    };
  }, [_callback, delay]);
};

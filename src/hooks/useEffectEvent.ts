import {useCallback, useLayoutEffect, useRef} from 'react';

/**
 * In-house version of https://react.dev/learn/separating-events-from-effects#declaring-an-effect-event.
 * Once it's stable in React, we can remove this.
 */
export const useEffectEvent = <TArgs extends unknown[], TReturnValue>(
  callback: Callback<TArgs, TReturnValue>,
) => {
  const callbackRef = useRef<Callback<TArgs, TReturnValue>>(() => {
    throw new Error('Forbidden to call an event handler while rendering.');
  });

  useLayoutEffect(() => {
    callbackRef.current = callback;
  });

  return useCallback<Callback<TArgs, TReturnValue>>(
    (...args) => callbackRef.current(...args),
    [],
  );
};

type Callback<TArgs extends unknown[], TReturnValue> = (
  ...args: TArgs
) => TReturnValue;

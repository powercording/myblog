'use client';

import { useEffect, useRef } from 'react';

type Handler = (...args: any[]) => void;

export const useInterval = (callback: Handler, delay: number) => {
  const callbackRef = useRef<Handler>(null);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const handler = (...args: any[]) => callbackRef.current?.(...args);

    if (delay !== null) {
      const interval = setInterval(handler, delay);
      return () => clearInterval(interval);
    }
  }, [delay]);
};

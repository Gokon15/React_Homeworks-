import { useRef, useCallback } from 'react';

export const useDebounce = () => {
  const timerRef = useRef(null);
  return useCallback(
    (callback) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => {
        callback();
      }, 200);
    },
    [],
  );
};
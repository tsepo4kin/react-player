import { useCallback, useRef } from "react";

export default function useDebounce(cb: (args?: any) => void, delay: number) {
  let timer = useRef<NodeJS.Timeout | undefined>();

  const debouncedCallback = useCallback((...args: Array<unknown>) => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      cb(...args);
    }, delay);
  }, [cb, delay]);

  return debouncedCallback;
}

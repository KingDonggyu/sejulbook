import { useEffect } from 'react';

interface DebounceProps<T> {
  value: T;
  onDebounce: (value: T) => void;
  delay?: number;
}

const useDebounce = <T>({
  value,
  onDebounce,
  delay = 275,
}: DebounceProps<T>) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDebounce(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay, onDebounce]);
};

export default useDebounce;

import { RefObject, useEffect } from 'react';

type Event = MouseEvent | TouchEvent;

const useClickOutside = <T extends HTMLElement>(
  ref: RefObject<T>,
  callback: (event: Event) => void,
) => {
  useEffect(() => {
    const handleClick = (e: Event) => {
      if (ref.current && !ref.current.contains(e.target as Node | null)) {
        callback(e);
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [callback, ref]);
};

export default useClickOutside;

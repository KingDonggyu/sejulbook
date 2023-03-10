import { useEffect } from 'react';
import { useLayoutContext } from '@/contexts/layoutContext';

const useLayoutVisibility = (isHide = true) => {
  const {
    showHeaderBar,
    hideHeaderBar,
    showScreenModeButton,
    hideScreenModeButton,
  } = useLayoutContext();

  useEffect(() => {
    if (isHide) {
      hideHeaderBar();
      hideScreenModeButton();
    }

    return () => {
      showHeaderBar();
      showScreenModeButton();
    };
  }, [
    hideHeaderBar,
    hideScreenModeButton,
    isHide,
    showHeaderBar,
    showScreenModeButton,
  ]);
};

export default useLayoutVisibility;

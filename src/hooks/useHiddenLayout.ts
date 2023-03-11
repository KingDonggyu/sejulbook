import { useEffect } from 'react';
import { useLayoutContext } from '@/contexts/layoutContext';

const useHiddenLayout = () => {
  const {
    showHeaderBar,
    hideHeaderBar,
    showScreenModeButton,
    hideScreenModeButton,
  } = useLayoutContext();

  useEffect(() => {
    hideHeaderBar();
    hideScreenModeButton();

    return () => {
      showHeaderBar();
      showScreenModeButton();
    };
  }, [
    hideHeaderBar,
    hideScreenModeButton,
    showHeaderBar,
    showScreenModeButton,
  ]);
};

export default useHiddenLayout;

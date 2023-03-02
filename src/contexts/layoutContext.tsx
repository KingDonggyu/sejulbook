import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { css } from '@emotion/react';
import HeaderBar from '@/components/organisms/HeaderBar';
import ScreenModeButton from '@/components/organisms/SceenModeButton';
import 'react-toastify/dist/ReactToastify.css';

const mainStyle = (isVisibleHeaderBar: boolean) => css`
  margin: auto;
  padding: ${isVisibleHeaderBar ? `5rem 20px` : `20px`};
  max-width: 80rem;
`;

interface LayoutContextProps {
  isVisibleHeaderBar: boolean;
  showHeaderBar: () => void;
  showScreenModeButton: () => void;
  hideHeaderBar: () => void;
  hideScreenModeButton: () => void;
}

const LayoutContext = createContext<LayoutContextProps>({
  isVisibleHeaderBar: true,
  showHeaderBar: () => {},
  showScreenModeButton: () => {},
  hideHeaderBar: () => {},
  hideScreenModeButton: () => {},
});

const LayoutProvider = ({ children }: { children: ReactNode }) => {
  const [isVisibleHeaderBar, setIsVisible] = useState(true);
  const [isVisibleScreenModeButton, setIsVisibleScreenModeButton] =
    useState(true);

  const contextProps: LayoutContextProps = useMemo(
    () => ({
      isVisibleHeaderBar,
      showHeaderBar: () => setIsVisible(true),
      hideHeaderBar: () => setIsVisible(false),
      showScreenModeButton: () => setIsVisibleScreenModeButton(true),
      hideScreenModeButton: () => setIsVisibleScreenModeButton(false),
    }),
    [isVisibleHeaderBar],
  );

  return (
    <LayoutContext.Provider value={contextProps}>
      {isVisibleHeaderBar && <HeaderBar />}
      <main css={mainStyle(isVisibleHeaderBar)}>{children}</main>
      {isVisibleScreenModeButton && <ScreenModeButton />}
      <ToastContainer
        theme="colored"
        position="bottom-left"
        style={{ lineHeight: 1.4 }}
      />
    </LayoutContext.Provider>
  );
};

const useLayoutContext = () => useContext(LayoutContext);

export { LayoutProvider, useLayoutContext };

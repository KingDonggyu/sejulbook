import {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { ThemeProvider, Theme } from '@emotion/react';
import ClientStorage from '@/lib/ClientStorage';
import { lightTheme, darkTheme } from '@/styles/theme';

const SEJULBOOK_DARK = 'SEJULBOOL_DARK';

enum ScreenModeState {
  DARK = 'Y',
  LIGHT = 'N',
}

interface ScreenModeContextProps {
  isDarkMode: boolean;
  theme: Theme;
  toggleScreenMode: () => void;
}

const ScreenModeContext = createContext<ScreenModeContextProps>({
  isDarkMode: false,
  theme: lightTheme,
  toggleScreenMode: () => {},
});

const ScreenModeProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [theme, setTheme] = useState(lightTheme);
  const [screenModeStorage, setScreenModeStrage] =
    useState<ClientStorage<ScreenModeState> | null>(null);

  const contextProps: ScreenModeContextProps = useMemo(
    () => ({
      isDarkMode,
      theme: isDarkMode ? darkTheme : lightTheme,
      toggleScreenMode: () => {
        if (isDarkMode) {
          screenModeStorage?.set(ScreenModeState.LIGHT);
          setIsDarkMode(false);
          return;
        }
        screenModeStorage?.set(ScreenModeState.DARK);
        setIsDarkMode(true);
      },
    }),
    [isDarkMode, screenModeStorage],
  );

  useEffect(
    () =>
      setScreenModeStrage(
        new ClientStorage<ScreenModeState>(SEJULBOOK_DARK, localStorage),
      ),
    [],
  );

  useEffect(
    () => setIsDarkMode(screenModeStorage?.get() === ScreenModeState.DARK),
    [screenModeStorage],
  );

  useEffect(() => setTheme(isDarkMode ? darkTheme : lightTheme), [isDarkMode]);

  return (
    <ScreenModeContext.Provider value={contextProps}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ScreenModeContext.Provider>
  );
};

const useScreenModeContext = () => useContext(ScreenModeContext);

export { ScreenModeProvider, useScreenModeContext };

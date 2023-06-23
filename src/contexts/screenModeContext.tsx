import {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { ThemeProvider, Theme } from '@emotion/react';
import { lightTheme, darkTheme } from '@/styles/theme';
import ScreenModeRepository from '@/repository/localStorage/ScreenModeRepository';

interface ScreenModeContextProps {
  theme: Theme;
  isDarkMode: boolean;
  toggleScreenMode: () => void;
}

const ScreenModeContext = createContext<ScreenModeContextProps>({
  theme: lightTheme,
  isDarkMode: false,
  toggleScreenMode: () => {},
});

const ScreenModeProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [theme, setTheme] = useState(lightTheme);

  const screenModeRepository = useMemo(() => new ScreenModeRepository(), []);

  const contextProps: ScreenModeContextProps = useMemo(
    () => ({
      theme,
      isDarkMode,
      toggleScreenMode: () => {
        if (isDarkMode) {
          screenModeRepository.setLightMode();
          setIsDarkMode(false);
          return;
        }
        screenModeRepository.setDarkMode();
        setIsDarkMode(true);
      },
    }),
    [isDarkMode, screenModeRepository, theme],
  );

  useEffect(() => {
    setIsDarkMode(screenModeRepository.checkIsDarkMode());
  }, [screenModeRepository]);

  useEffect(() => setTheme(isDarkMode ? darkTheme : lightTheme), [isDarkMode]);

  return (
    <ScreenModeContext.Provider value={contextProps}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ScreenModeContext.Provider>
  );
};

const useScreenModeContext = () => useContext(ScreenModeContext);

export { ScreenModeProvider, useScreenModeContext };

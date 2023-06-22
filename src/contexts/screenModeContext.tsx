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
  const [screenModeRepository, setScreenModeRepository] =
    useState<ScreenModeRepository | null>(null);

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [theme, setTheme] = useState(lightTheme);

  const contextProps: ScreenModeContextProps = useMemo(
    () => ({
      isDarkMode,
      theme,
      toggleScreenMode: () => {
        if (isDarkMode) {
          screenModeRepository?.setLightMode();
          setIsDarkMode(false);
          return;
        }
        screenModeRepository?.setDarkMode();
        setIsDarkMode(true);
      },
    }),
    [isDarkMode, screenModeRepository, theme],
  );

  useEffect(() => {
    const repository = new ScreenModeRepository();
    setScreenModeRepository(repository);
    setIsDarkMode(repository.checkIsDarkMode());
  }, []);

  useEffect(() => setTheme(isDarkMode ? darkTheme : lightTheme), [isDarkMode]);

  return (
    <ScreenModeContext.Provider value={contextProps}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ScreenModeContext.Provider>
  );
};

const useScreenModeContext = () => useContext(ScreenModeContext);

export { ScreenModeProvider, useScreenModeContext };

import { BsMoon } from '@react-icons/all-files/bs/BsMoon';
import { BiSun } from '@react-icons/all-files/bi/BiSun';
import Button from '@/components/atoms/Button';
import { useScreenModeContext } from '@/contexts/screenModeContext';
import { lightTheme, darkTheme } from '@/styles/theme';

const ScreenModeButton = () => {
  const { isDarkMode, toggleScreenMode } = useScreenModeContext();

  return (
    <Button onClick={toggleScreenMode}>
      {isDarkMode ? (
        <BiSun size={25} color={darkTheme.COLOR.WHITE} />
      ) : (
        <BsMoon size={25} color={lightTheme.COLOR.BLACK} />
      )}
    </Button>
  );
};

export default ScreenModeButton;

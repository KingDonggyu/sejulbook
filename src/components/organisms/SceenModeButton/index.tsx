import { BsMoon } from '@react-icons/all-files/bs/BsMoon';
import { BiSun } from '@react-icons/all-files/bi/BiSun';
import Button from '@/components/atoms/Button';
import { useScreenModeContext } from '@/contexts/screenModeContext';
import { lightTheme, darkTheme } from '@/styles/theme';
import { iconButtonStyle } from '@/styles/common';

const ScreenModeButton = () => {
  const { isDarkMode, toggleScreenMode } = useScreenModeContext();

  return (
    <Button css={iconButtonStyle} onClick={toggleScreenMode}>
      {isDarkMode ? (
        <>
          <BiSun size={25} color={darkTheme.COLOR.WHITE} />
          라이트 모드 버튼
        </>
      ) : (
        <>
          <BsMoon size={25} color={lightTheme.COLOR.BLACK} />
          다크 모드 버튼
        </>
      )}
    </Button>
  );
};

export default ScreenModeButton;

import { css, Theme } from '@emotion/react';
import { BsMoon } from '@react-icons/all-files/bs/BsMoon';
import { BiSun } from '@react-icons/all-files/bi/BiSun';
import { ButtonVariant } from '@/constants';
import { SCREEN_MODE_BUTTON_Z_INDEX } from '@/constants/zIndex';
import Button from '@/components/atoms/Button';
import { useScreenModeContext } from '@/contexts/screenModeContext';
import { lightTheme, darkTheme } from '@/styles/theme';

const screenModeButtonStyle = (theme: Theme) => css`
  z-index: ${SCREEN_MODE_BUTTON_Z_INDEX};
  position: fixed;
  right: 30px;
  bottom: 25px;
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 10px 15px;
  border-radius: 20px;
  font-size: ${theme.FONT_SIZE.EXTRA_SMALL};
  @media screen and (max-width: ${theme.MAX_WIDTH.TABLET}) {
    right: 10px;
    bottom: 10px;
  }
`;

const ScreenModeButton = () => {
  const { isDarkMode, toggleScreenMode } = useScreenModeContext();

  return (
    <Button
      elevation={7}
      variant={ButtonVariant.CONTAINED}
      css={screenModeButtonStyle}
      onClick={toggleScreenMode}
    >
      {isDarkMode ? (
        <>
          <BiSun size={15} color={darkTheme.COLOR.WHITE} />
          <span>라이트 모드로 보기</span>
        </>
      ) : (
        <>
          <BsMoon size={15} color={lightTheme.COLOR.BLACK} />
          <span>다크 모드로 보기</span>
        </>
      )}
    </Button>
  );
};

export default ScreenModeButton;

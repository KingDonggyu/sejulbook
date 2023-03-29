import Link from 'next/link';
import { css } from '@emotion/react';
import Route from '@/constants/routes';
import { StyleProps } from '@/types/style';
import Logo from '@/components/atoms/Logo';
import { useScreenModeContext } from '@/contexts/screenModeContext';

const LogoButton = ({ style, css: cssProps }: StyleProps) => {
  const { isDarkMode } = useScreenModeContext();

  return (
    <Link
      href={Route.HOME}
      css={
        cssProps ||
        css`
          display: block;
        `
      }
      style={style}
    >
      <Logo isDarkMode={isDarkMode} />
    </Link>
  );
};

export default LogoButton;

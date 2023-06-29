import Link from 'next/link';
import { css, StyleProps } from '@emotion/react';
import Route from '@/constants/routes';
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

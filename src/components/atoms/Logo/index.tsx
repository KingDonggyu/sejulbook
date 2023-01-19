import Image from 'next/image';
import { css } from '@emotion/react';
import logoLightSrc from '@public/images/logo-light.svg';
import logoDarkSrc from '@public/images/logo-dark.svg';

interface LogoProps {
  width?: string;
  isDarkMode: boolean;
}

const Logo = ({ width, isDarkMode }: LogoProps) => (
  <Image
    src={isDarkMode ? logoDarkSrc : logoLightSrc}
    alt="로고 이미지"
    css={css`
      width: ${width || '100%'};
      height: auto;
    `}
  />
);

export default Logo;

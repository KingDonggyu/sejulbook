import Image from 'next/image';
import logoLightSrc from '@public/images/logo-light.svg';
import logoDarkSrc from '@public/images/logo-dark.svg';

interface LogoProps {
  isDarkMode: boolean;
}

const Logo = ({ isDarkMode }: LogoProps) => (
  <Image
    src={isDarkMode ? logoDarkSrc : logoLightSrc}
    alt="로고 이미지"
    style={{ width: '100%', height: 'auto' }}
  />
);

export default Logo;

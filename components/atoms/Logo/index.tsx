import Image from 'next/image';
import logoLightSrc from '@/public/images/logo-light.svg';
import logoDarkSrc from '@/public/images/logo-dark.svg';

interface LogoProps {
  isDark: boolean;
}

const Logo = ({ isDark }: LogoProps) => (
  <Image
    src={isDark ? logoDarkSrc : logoLightSrc}
    alt="로고 이미지"
    style={{ width: '100%' }}
  />
);

export default Logo;

import Link from 'next/link';
import { css as emotionCSS } from '@emotion/react';
import Route from '@/constants/routes';
import { StyleProps } from '@/types/style';
import Logo from '@/components/atoms/Logo';

type LogoButtonProps = { isDarkMode: boolean } & StyleProps;

const LogoButton = ({ isDarkMode, style, css }: LogoButtonProps) => (
  <Link href={Route.HOME} css={css || emotionCSS`width: 120px;`} style={style}>
    <Logo isDarkMode={isDarkMode} />
  </Link>
);

export default LogoButton;

import { css as emotionCSS } from '@emotion/react';
import { StyleProps } from '@/types/style';
import Button from '@/components/atoms/Button';
import Logo from '@/components/atoms/Logo';

type LogoButtonProps = { isDarkMode: boolean } & StyleProps;

const LogoButton = ({ isDarkMode, style, css }: LogoButtonProps) => (
  <Button hover={false} css={css || emotionCSS`width: 120px;`} style={style}>
    <Logo isDarkMode={isDarkMode} />
  </Button>
);

export default LogoButton;

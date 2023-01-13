import { StyleProps } from '@/types/style';
import Button from '@/components/atoms/Button';
import Logo from '@/components/atoms/Logo';

type LogoButtonProps = { isDarkMode: boolean } & StyleProps;

const LogoButton = ({ isDarkMode, style, css }: LogoButtonProps) => (
  <Button hover={false} style={style || { width: '120px' }} css={css}>
    <Logo isDarkMode={isDarkMode} />
  </Button>
);

export default LogoButton;

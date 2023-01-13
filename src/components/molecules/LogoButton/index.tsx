import { StyleProps } from '@/src/types/style';
import Button from '@/src/components/atoms/Button';
import Logo from '@/src/components/atoms/Logo';

const LogoButton = ({ style, css }: StyleProps) => (
  <Button hover={false} style={style || { width: '140px' }} css={css}>
    <Logo isDark={false} />
  </Button>
);

export default LogoButton;

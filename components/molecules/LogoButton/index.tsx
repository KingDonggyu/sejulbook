import { StyleProps } from '@/types/style';
import Button from '@/components/atoms/Button';
import Logo from '@/components/atoms/Logo';

const LogoButton = ({ style, css }: StyleProps) => (
  <Button hover={false} style={style || { width: '140px' }} css={css}>
    <Logo isDark={false} />
  </Button>
);

export default LogoButton;

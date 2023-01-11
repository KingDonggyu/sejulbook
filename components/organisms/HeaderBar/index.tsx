import Logo from '@/components/atoms/Logo';
import * as s from './style';

const HeaderBar = () => (
  <s.Wrapper>
    <s.LogoButton type="button">
      <Logo isDark={false} />
    </s.LogoButton>
  </s.Wrapper>
);

export default HeaderBar;

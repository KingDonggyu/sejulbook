import LogoButton from '@/components/molecules/LogoButton';
import ProfileButton from '@/components/molecules/ProfileButton';
import * as s from './style';

const HeaderBar = () => (
  <s.Wrapper>
    <LogoButton />
    <ProfileButton />
  </s.Wrapper>
);

export default HeaderBar;

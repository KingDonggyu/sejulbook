import LogoButton from '@/components/molecules/LogoButton';
import ProfileButton from '@/components/organisms/ProfileButton';
import SearchButton from '@/components/molecules/SearchButton';
import * as s from './style';

const HeaderBar = () => (
  <s.Wrapper>
    <LogoButton />
    <s.RightItemsWrapper>
      <ProfileButton />
      <SearchButton />
    </s.RightItemsWrapper>
  </s.Wrapper>
);

export default HeaderBar;

import LogoButton from '@/components/molecules/LogoButton';
import ProfileButton from '@/components/organisms/ProfileButton';
import SearchButton from '@/components/molecules/SearchButton';
import ScreenModeButton from '../SceenModeButton';
import * as s from './style';

const HeaderBar = () => (
  <s.Background>
    <s.Wrapper>
      <LogoButton />
      <s.RightItemsWrapper>
        <ProfileButton />
        <SearchButton />
        <ScreenModeButton />
      </s.RightItemsWrapper>
    </s.Wrapper>
  </s.Background>
);

export default HeaderBar;

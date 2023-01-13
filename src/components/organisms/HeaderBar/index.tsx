import LogoButton from '@/src/components/molecules/LogoButton';
import ProfileButton from '@/src/components/organisms/ProfileButton';
import SearchButton from '@/src/components/molecules/SearchButton';
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

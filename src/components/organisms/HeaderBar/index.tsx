import LogoButton from '@/components/molecules/LogoButton';
import SearchButton from '@/components/molecules/SearchButton';
import UserButton from '@/components/organisms/UserButton';
import { useScreenModeContext } from '@/contexts/screenModeContext';
import * as s from './style';

const HeaderBar = () => {
  const { isDarkMode } = useScreenModeContext();

  return (
    <s.Background>
      <s.Wrapper>
        <LogoButton isDarkMode={isDarkMode} />
        <s.RightItemsWrapper>
          <UserButton />
          <SearchButton />
        </s.RightItemsWrapper>
      </s.Wrapper>
    </s.Background>
  );
};

export default HeaderBar;

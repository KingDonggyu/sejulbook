import LogoButton from '@/components/molecules/LogoButton';
import SearchButton from '@/components/molecules/SearchButton';
import NavDropdown from '@/components/organisms/NavDropdown';
import AccountButton from '@/components/organisms/AccountButton';
import useLoginStatus from '@/hooks/useLoginStatus';
import { useScreenModeContext } from '@/contexts/screenModeContext';
import * as s from './style';

const HeaderBar = () => {
  const { isLogin } = useLoginStatus();
  const { isDarkMode } = useScreenModeContext();

  return (
    <s.Background>
      <s.Wrapper>
        <LogoButton isDarkMode={isDarkMode} />
        <s.RightItemsWrapper>
          {isLogin ? <NavDropdown /> : <AccountButton isLogin={false} />}
          <SearchButton />
        </s.RightItemsWrapper>
      </s.Wrapper>
    </s.Background>
  );
};

export default HeaderBar;

import LogoButton from '@/components/molecules/LogoButton';
import SearchButton from '@/components/molecules/SearchButton';
import NavDropdown from '@/components/organisms/NavDropdown';
import AccountButton from '@/components/organisms/AccountButton';
import useUserStatus from '@/hooks/useUserStatus';
import { useScreenModeContext } from '@/contexts/screenModeContext';
import * as s from './style';

const HeaderBar = () => {
  const { session, isLogin, isLoading } = useUserStatus();
  const { isDarkMode } = useScreenModeContext();

  return (
    <s.Background>
      <s.Wrapper>
        <LogoButton isDarkMode={isDarkMode} />
        <s.RightItemsWrapper>
          {isLogin ? (
            <NavDropdown userId={session.id} />
          ) : (
            !isLoading && <AccountButton isLogin={false} />
          )}
          <SearchButton />
        </s.RightItemsWrapper>
      </s.Wrapper>
    </s.Background>
  );
};

export default HeaderBar;

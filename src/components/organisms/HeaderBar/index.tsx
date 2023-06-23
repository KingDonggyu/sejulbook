import LogoButton from '@/components/molecules/LogoButton';
import SearchButton from '@/components/molecules/SearchButton';
import NavDropdown from '@/components/organisms/NavDropdown';
import AccountButton from '@/components/organisms/AccountButton';
import useUserStatus from '@/hooks/useUserStatus';
import * as s from './style';

const HeaderBar = () => {
  const { session, isLogin, isLoading } = useUserStatus();

  return (
    <s.Background>
      <s.Wrapper>
        <LogoButton />
        <s.RightItemsWrapper>
          {isLogin ? (
            <NavDropdown />
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

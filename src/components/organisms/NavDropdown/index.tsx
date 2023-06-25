import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { IoIosArrowDown } from '@react-icons/all-files/io/IoIosArrowDown';
import { IoIosArrowUp } from '@react-icons/all-files/io/IoIosArrowUp';

import { BoxVariant } from '@/constants';
import Route from '@/constants/routes';
import useOpenClose from '@/hooks/useOpenClose';
import useMe from '@/hooks/useMe';
import Button from '@/components/atoms/Button';
import Menu from '@/components/molecules/Menu';
import AccountButton from '@/components/organisms/AccountButton';
import * as s from './style';

const NavDropdown = () => {
  const { user } = useMe();
  const router = useRouter();
  const { anchorEl, handleToggle, handleClose } = useOpenClose();
  const isShowMenu = Boolean(anchorEl);

  useEffect(() => {
    router.events.on('routeChangeStart', handleClose);
    return () => {
      router.events.off('routeChangeStart', handleClose);
    };
  }, [handleClose, router.events]);

  if (!user) {
    return null;
  }

  return (
    <div>
      <Button onClick={handleToggle} css={s.nickNameButtonStyle}>
        <s.Nickname>{user.name}</s.Nickname>
        {isShowMenu ? <IoIosArrowUp size={17} /> : <IoIosArrowDown size={17} />}
      </Button>
      <Menu
        top={13}
        right={1}
        divider={false}
        variant={BoxVariant.OUTLINED}
        anchorEl={anchorEl}
        handleClose={handleClose}
      >
        <s.MenuItem>
          <Link href={`${Route.LIBRARY}/${user.id}`}>내 서재</Link>
        </s.MenuItem>
        <s.MenuItem>
          <Link href={`${Route.SUBSCRIPTIONS}`}>관심 서재</Link>
        </s.MenuItem>
        <s.MenuItem>
          <Link href={Route.NEWBOOK_SEARCH}>독후감 쓰기</Link>
        </s.MenuItem>
        <s.MenuItem>
          <AccountButton isLogin />
        </s.MenuItem>
      </Menu>
    </div>
  );
};

export default NavDropdown;

import Link from 'next/link';
import { IoIosArrowDown } from '@react-icons/all-files/io/IoIosArrowDown';
import { IoIosArrowUp } from '@react-icons/all-files/io/IoIosArrowUp';
import { BoxVariant } from '@/constants';
import Route from '@/constants/routes';
import useUser from '@/hooks/services/queries/useUser';
import useOpenClose from '@/hooks/useOpenClose';
import Button from '@/components/atoms/Button';
import Menu from '@/components/molecules/Menu';
import AccountButton from '@/components/organisms/AccountButton';
import { UserId } from '@/types/features/user';
import * as s from './style';

const NavDropdown = ({ userId }: { userId: UserId }) => {
  const user = useUser(userId);
  const { anchorEl, handleToggle, handleClose } = useOpenClose();
  const isShowMenu = Boolean(anchorEl);

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
          <Link href={`${Route.LIBRARY}/${userId}`} onClick={handleClose}>
            내 서재
          </Link>
        </s.MenuItem>
        <s.MenuItem>
          <Link href={Route.NEWBOOK_SEARCH} onClick={handleClose}>
            독후감 쓰기
          </Link>
        </s.MenuItem>
        <s.MenuItem>
          <AccountButton isLogin />
        </s.MenuItem>
      </Menu>
    </div>
  );
};

export default NavDropdown;

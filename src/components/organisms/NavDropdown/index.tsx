import Link from 'next/link';
import { IoIosArrowDown } from '@react-icons/all-files/io/IoIosArrowDown';
import { IoIosArrowUp } from '@react-icons/all-files/io/IoIosArrowUp';
import { BoxVariant } from '@/constants';
import Route from '@/constants/routes';
import useLoginStatus from '@/hooks/useLoginStatus';
import useDropdownMenu from '@/hooks/useDropdownMenu';
import Button from '@/components/atoms/Button';
import Menu from '@/components/molecules/Menu';
import AccountButton from '../AccountButton';
import * as s from './style';

const MyLibraryLink = ({ handleClick }: { handleClick: () => void }) => (
  <Link href={`${Route.LIBRARY}/1`} onClick={handleClick}>
    내 서재
  </Link>
);

const NewbookLink = ({ handleClick }: { handleClick: () => void }) => (
  <Link href={Route.NEWBOOK_SEARCH} onClick={handleClick}>
    독후감 쓰기
  </Link>
);

const NavDropdown = () => {
  const { session } = useLoginStatus();
  const { anchorEl, handleMenuToggle, handleMenuClose } = useDropdownMenu();
  const isShowMenu = Boolean(anchorEl);

  return (
    <div>
      <Button onClick={handleMenuToggle} css={s.nickNameButtonStyle}>
        <s.Nickname>{session?.user?.name}</s.Nickname>
        {isShowMenu ? <IoIosArrowUp size={17} /> : <IoIosArrowDown size={17} />}
      </Button>
      <Menu
        top={13}
        right={1}
        divider={false}
        variant={BoxVariant.OUTLINED}
        anchorEl={anchorEl}
        handleClose={handleMenuClose}
      >
        {[
          <MyLibraryLink handleClick={handleMenuClose} />,
          <NewbookLink handleClick={handleMenuClose} />,
          <AccountButton.Logout />,
        ].map((component) => (
          <s.MenuItem key={component.type}>{component}</s.MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default NavDropdown;

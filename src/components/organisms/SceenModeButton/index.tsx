import { BsMoon } from '@react-icons/all-files/bs/BsMoon';
import { BiSun } from '@react-icons/all-files/bi/BiSun';
import Button from '@/src/components/atoms/Button';
import theme from '@/src/styles/theme';

const ScreenModeButton = () => (
  <Button>
    <BsMoon size={25} color={theme.COLOR.BLACK} />
    <BiSun size={30} color={theme.COLOR.WHITE} />
  </Button>
);

export default ScreenModeButton;

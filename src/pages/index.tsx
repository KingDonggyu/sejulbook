import { ModalKey } from '@/constants/keys';
import HeaderBar from '@/components/organisms/HeaderBar';
import LoginModal from '@/components/organisms/LoginModal';

const HomePage = () => (
  <>
    <HeaderBar />
    <LoginModal modalKey={ModalKey.LOGIN} />
  </>
);

export default HomePage;

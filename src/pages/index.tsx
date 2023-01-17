import { ModalKey } from '@/constants/keys';
import HeaderBar from '@/components/organisms/HeaderBar';
import LoginModal from '@/components/organisms/LoginModal';

const Home = () => (
  <>
    <HeaderBar />
    <LoginModal modalKey={ModalKey.LOGIN} />
  </>
);

export default Home;

import DocumentTitle from '@/components/atoms/DocumentTitle';
import ProfileSettingModal from '@/components/organisms/ProfileSettingModal';
import { ModalKey } from '@/constants/keys';

const HomePage = () => (
  <>
    <DocumentTitle />
    <ProfileSettingModal modalKey={ModalKey.PROFILE_SETTING} title="회원가입" />
  </>
);

export default HomePage;

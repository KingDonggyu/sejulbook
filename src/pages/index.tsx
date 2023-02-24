import { useEffect } from 'react';
import { signIn, signOut } from 'next-auth/react';
import { toast } from 'react-toastify';
import DocumentTitle from '@/components/atoms/DocumentTitle';
import ProfileSettingModal from '@/components/organisms/ProfileSettingModal';
import { ModalKey } from '@/constants/keys';
import useLoginStatus from '@/hooks/useLoginStatus';
import modalStore from '@/stores/modalStore';
import { signUp } from '@/services/api/user';
import { Introduce, UserName } from '@/types/features/user';
import { UserError } from '@/services/errors';

const HomePage = () => {
  const { session, isSignupRequired } = useLoginStatus();
  const { openModal } = modalStore();

  const handleSignUp = async ({
    name,
    introduce,
  }: {
    name: UserName;
    introduce: Introduce;
  }) => {
    try {
      if ('email' in session) {
        await signUp({ name, introduce, ...session });
        await signIn(session.oAuth);
      }
    } catch (error) {
      if (error instanceof UserError) {
        toast.error(error.message);
      }
    }
  };

  useEffect(() => {
    if (isSignupRequired) {
      openModal(ModalKey.PROFILE_SETTING);
    }
  }, [isSignupRequired, openModal]);

  return (
    <>
      <DocumentTitle />
      <ProfileSettingModal
        modalKey={ModalKey.PROFILE_SETTING}
        title="회원가입"
        handleComplete={handleSignUp}
        handleCancel={() => signOut()}
      />
    </>
  );
};

export default HomePage;

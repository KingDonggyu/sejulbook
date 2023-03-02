import { useEffect } from 'react';
import { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth/next';
import { signIn, signOut } from 'next-auth/react';
import { toast } from 'react-toastify';
import { dehydrate } from '@tanstack/react-query';

import { authOptions } from '@/pages/api/auth/[...nextauth]';
import DocumentTitle from '@/components/atoms/DocumentTitle';
import ProfileSettingModal from '@/components/organisms/ProfileSettingModal';
import { ModalKey } from '@/constants/keys';
import useLoginStatus from '@/hooks/useLoginStatus';
import modalStore from '@/stores/modalStore';
import { signUp } from '@/services/api/user';
import UserError from '@/services/errors/UserError';
import { getUserQuery } from '@/services/queries/user';
import { Introduce, UserName } from '@/types/features/user';
import prefetchQuery from '@/services/prefetchQuery';

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
      if (isSignupRequired) {
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

export const getServerSideProps = async ({
  req,
  res,
}: GetServerSidePropsContext) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session || session.id === null) {
    return {
      props: { dehydratedState: null },
    };
  }

  const queryClient = await prefetchQuery([getUserQuery(session.id)]);

  return {
    props: { dehydratedState: dehydrate(queryClient) },
  };
};

export default HomePage;

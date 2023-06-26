import { useState } from 'react';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';
import DeleteTemplate from '@/components/templates/Delete';
import Route from '@/constants/routes';
import useUserDeletion from '@/hooks/services/mutations/useUserDeletion';
import checkIsLoggedIn from '@/server/middlewares/checkIsLoggedIn';

const DeletePage = () => {
  const [isAgree, setIsAgree] = useState(false);
  const router = useRouter();

  const deleteUser = useUserDeletion({
    onSuccess: () => {
      signOut().then(() => router.replace(Route.HOME));
    },
  });

  const handleClickAgreeCheckBox = () => {
    setIsAgree(!isAgree);
  };

  const handleClickDeleteButton = () => {
    if (!isAgree) {
      alert('동의 후 다시 시도해 주세요.');
      return;
    }

    deleteUser();
  };

  return (
    <DeleteTemplate
      isAgree={isAgree}
      onClickAgreeCheckBox={handleClickAgreeCheckBox}
      onClickDeleteButton={handleClickDeleteButton}
    />
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { isLoggedIn } = await checkIsLoggedIn(ctx);

  if (!isLoggedIn) {
    return {
      redirect: {
        permanent: false,
        destination: Route.HOME,
      },
      props: {},
    };
  }

  return { props: {} };
};

export default DeletePage;

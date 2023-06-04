import { useEffect, useState } from 'react';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';
import DeleteTemplate from '@/components/templates/Delete';
import checkLogin from '@/services/middlewares/checkLogin';
import { UserId } from '@/types/features/user';
import Route from '@/constants/routes';
import useUserDeletion from '@/hooks/services/mutations/useUserDeletion';

interface DeletePageProps {
  myId: UserId | null;
}

const DeletePage = ({ myId }: DeletePageProps) => {
  const [isAgree, setIsAgree] = useState(false);
  const router = useRouter();

  const deleteUser = useUserDeletion({
    onSuccess: () => {
      router.replace(Route.HOME);
    },
  });

  useEffect(() => {
    if (!myId) {
      router.replace(Route.HOME);
    }
  }, [myId, router]);

  if (!myId) {
    return null;
  }

  const handleClickAgreeCheckBox = () => {
    setIsAgree(!isAgree);
  };

  const handleClickDeleteButton = () => {
    if (!isAgree) {
      alert('동의 후 다시 시도해 주세요.');
      return;
    }

    signOut();
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
  const serverSideProps = await checkLogin(ctx);

  if (!serverSideProps.props.userId) {
    return {
      props: {
        myId: null,
      },
    };
  }

  return {
    props: {
      myId: serverSideProps.props.userId,
    },
  };
};

export default DeletePage;

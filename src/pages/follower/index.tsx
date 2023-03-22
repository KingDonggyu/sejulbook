import { GetServerSidePropsContext } from 'next';
import { dehydrate } from '@tanstack/react-query';
import DocumentTitle from '@/components/atoms/DocumentTitle';
import checkLogin, { checkRedirect } from '@/services/middlewares/checkLogin';
import prefetchQuery from '@/services/prefetchQuery';
import { getUserQuery } from '@/services/queries/user';
import useUser from '@/hooks/services/queries/useUser';
import { UserId } from '@/types/features/user';
import Follow from '@/components/templates/Follow';
import UserList from '@/components/organisms/UserList';

const userList = [
  { id: 7, name: '초이', introduce: '안녕하세요 초이입니다.', isFollow: true },
  { id: 7, name: '우로', introduce: '', isFollow: false },
  { id: 7, name: '초이', introduce: '안녕하세요 초이입니다.', isFollow: true },
  { id: 7, name: '우로', introduce: '', isFollow: false },
  { id: 7, name: '초이', introduce: '', isFollow: true },
  { id: 7, name: '우로', introduce: '', isFollow: false },
  { id: 7, name: '초이', introduce: '안녕하세요 초이입니다.', isFollow: true },
  { id: 7, name: '우로', introduce: '', isFollow: false },
];

const FollowerPage = ({ myId }: { myId: UserId }) => {
  const user = useUser(myId);

  if (!user) {
    return null;
  }

  return (
    <>
      <DocumentTitle title={`${user.name}의 구독자`} />
      <Follow
        isFollowing={false}
        myName={user.name}
        userCount={27}
        userList={<UserList userList={userList} />}
      />
    </>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const serverSideProps = await checkLogin(ctx);

  if (checkRedirect(serverSideProps) || !serverSideProps.props.userId) {
    return serverSideProps;
  }

  const queryClient = await prefetchQuery([
    getUserQuery(serverSideProps.props.userId),
  ]);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      myId: serverSideProps.props.userId,
    },
  };
};

export default FollowerPage;

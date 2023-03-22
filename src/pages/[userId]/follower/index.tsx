import { GetServerSidePropsContext } from 'next';
import { dehydrate } from '@tanstack/react-query';
import DocumentTitle from '@/components/atoms/DocumentTitle';
import prefetchQuery from '@/services/prefetchQuery';
import {
  getFollowerUserListInfinityQuery,
  getUserQuery,
} from '@/services/queries/user';
import useUser from '@/hooks/services/queries/useUser';
import { UserId } from '@/types/features/user';
import Follow from '@/components/templates/Follow';
import UserList from '@/components/organisms/UserList';
import useFollowUserList from '@/hooks/services/queries/useFollowUserList';

const FollowerPage = ({ userId }: { userId: UserId }) => {
  const user = useUser(userId);
  const { followUserList, refetchNextFollowUserList } = useFollowUserList({
    userId,
    isFollowing: false,
  });

  return (
    <>
      <DocumentTitle title={`${user?.name || '알 수 없음'}의 구독자`} />
      <Follow
        isFollowing={false}
        myName={user?.name || '알 수 없음'}
        userCount={followUserList?.length || 0}
        userList={!!followUserList && <UserList userList={followUserList} />}
      />
    </>
  );
};

interface ExtendedGetServerSidePropsContext
  extends Omit<GetServerSidePropsContext, 'query'> {
  query: {
    userId: UserId;
  };
}

export const getServerSideProps = async ({
  query,
}: ExtendedGetServerSidePropsContext) => {
  const { userId } = query;
  const queryClient = await prefetchQuery(
    [getUserQuery(userId)],
    [getFollowerUserListInfinityQuery({ userId })],
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      userId,
    },
  };
};

export default FollowerPage;

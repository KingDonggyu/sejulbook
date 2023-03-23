import { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth/next';
import { dehydrate } from '@tanstack/react-query';
import DocumentTitle from '@/components/atoms/DocumentTitle';
import prefetchQuery from '@/services/prefetchQuery';
import {
  getFollowingUserListInfinityQuery,
  getUserQuery,
} from '@/services/queries/user';
import { getFollowInfoQuery } from '@/services/queries/follow';
import useUser from '@/hooks/services/queries/useUser';
import useFollowInfo from '@/hooks/services/queries/useFollowInfo';
import { UserId } from '@/types/features/user';
import Follow from '@/components/templates/Follow';
import UserList from '@/components/organisms/UserList';
import useFollowUserList from '@/hooks/services/queries/useFollowUserList';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

const FollowingPage = ({ userId }: { userId: UserId }) => {
  const user = useUser(userId);
  const { followingCount } = useFollowInfo(userId);

  const { followUserList, refetchNextFollowUserList, hasNextPage, isFetching } =
    useFollowUserList({
      targetUserId: userId,
      isFollowing: true,
    });

  const handleFetchMoreUserList = () => {
    if (hasNextPage && !isFetching) {
      refetchNextFollowUserList();
    }
  };

  return (
    <>
      <DocumentTitle title={`${user?.name || '알 수 없음'}의 관심서재`} />
      <Follow
        isFollowing
        myName={user?.name || '알 수 없음'}
        userCount={followingCount}
        userList={
          !!followUserList && (
            <UserList
              userList={followUserList}
              fetchMoreUserList={handleFetchMoreUserList}
            />
          )
        }
      />
    </>
  );
};

interface ExtendedGetServerSidePropsContext
  extends Omit<GetServerSidePropsContext, 'query'> {
  query: {
    userId: string;
  };
}

export const getServerSideProps = async ({
  req,
  res,
  query,
}: ExtendedGetServerSidePropsContext) => {
  const userId = Number(query.userId);
  const session = await getServerSession(req, res, authOptions);
  const myUserId = session ? session.id || undefined : undefined;

  const queryClient = await prefetchQuery(
    [getUserQuery(userId), getFollowInfoQuery({ targetUserId: userId })],
    [getFollowingUserListInfinityQuery({ myUserId, targetUserId: userId })],
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      userId,
    },
  };
};

export default FollowingPage;

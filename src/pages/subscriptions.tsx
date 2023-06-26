import { GetServerSidePropsContext } from 'next';
import { dehydrate } from '@tanstack/react-query';
import checkIsLoggedIn from '@/server/middlewares/checkIsLoggedIn';
import type { Id } from 'user';

import SEO from '@/components/atoms/SEO';
import Button from '@/components/atoms/Button';
import UserListModal from '@/components/organisms/UserListModal';
import Bookshelf from '@/components/organisms/Bookshelf';
import SubscriptionsTemplate from '@/components/templates/Subscriptions';
import modalStore from '@/stores/modalStore';
import { ModalKey } from '@/constants/keys';
import useFollowInfo, {
  getFollowInfoQuery,
} from '@/hooks/services/queries/useFollowInfo';
import useInfiniteFollowingBookReviewList, {
  getFollowingBookReviewListInfinityQuery,
} from '@/hooks/services/infiniteQueries/useInfiniteFollowingBookReviewList';
import prefetchQuery from '@/lib/react-query/prefetchQuery';
import Route from '@/constants/routes';

const SubscriptionsPage = ({ userId }: { userId: Id }) => {
  const { openModal } = modalStore();
  const { followInfo } = useFollowInfo(userId);

  const {
    followingBookReviewList,
    refetchNextFollowingBookReviewList,
    isLoading,
  } = useInfiniteFollowingBookReviewList();

  if (!followInfo) {
    return null;
  }

  return (
    <>
      <SEO title="관심서재" />
      <SubscriptionsTemplate
        followingUserListModalButton={
          <Button onClick={() => openModal(ModalKey.FOLLOWING_USER_LIST)}>
            관심서재 {followInfo.followingCount}
          </Button>
        }
        bookshelf={
          <Bookshelf
            isLoading={isLoading}
            hasWriteBookReviewItem={false}
            bookReviewList={followingBookReviewList}
            onRefetch={refetchNextFollowingBookReviewList}
          />
        }
      />
      <UserListModal
        userId={userId}
        modalKey={ModalKey.FOLLOWING_USER_LIST}
        isFollowing
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

export const getServerSideProps = async (
  ctx: ExtendedGetServerSidePropsContext,
) => {
  const { isLoggedIn, userId } = await checkIsLoggedIn(ctx);

  if (!isLoggedIn) {
    return {
      redirect: {
        permanent: false,
        destination: Route.HOME,
      },
      props: {},
    };
  }

  const queryClient = await prefetchQuery(
    [getFollowInfoQuery({ targetUserId: userId, myUserId: userId })],
    [getFollowingBookReviewListInfinityQuery({ myUserId: userId })],
  );

  return {
    props: { dehydratedState: dehydrate(queryClient), userId },
  };
};

export default SubscriptionsPage;

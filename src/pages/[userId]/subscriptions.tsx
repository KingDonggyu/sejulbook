import { GetServerSidePropsContext } from 'next';
import { dehydrate } from '@tanstack/react-query';
import DocumentTitle from '@/components/atoms/DocumentTitle';
import Button from '@/components/atoms/Button';
import UserListModal from '@/components/organisms/UserListModal';
import SubscriptionsTemplate from '@/components/templates/Subscriptions';
import { UserId } from '@/types/features/user';
import modalStore from '@/stores/modalStore';
import { ModalKey } from '@/constants/keys';

import useFollowInfo from '@/hooks/services/queries/useFollowInfo';
import useInfinityFollowingBookReviewList from '@/hooks/services/infinityQueries/useInfinityFollowingBookReviewList';
import checkLogin, { checkRedirect } from '@/services/middlewares/checkLogin';
import prefetchQuery from '@/services/prefetchQuery';
import { getFollowInfoQuery } from '@/services/queries/follow';
import { getFollowingBookReviewListInfinityQuery } from '@/services/queries/bookReview';
import Bookshelf from '@/components/organisms/Bookshelf';

const SubscriptionsPage = ({ myUserId }: { myUserId: UserId }) => {
  const { openModal } = modalStore();
  const { followingCount } = useFollowInfo(myUserId);

  const { followingBookReviewList, refetchNextFollowingBookReviewList } =
    useInfinityFollowingBookReviewList(myUserId);

  return (
    <>
      <DocumentTitle title="구독" />
      <SubscriptionsTemplate
        followingUserListModalButton={
          <Button onClick={() => openModal(ModalKey.FOLLOWING_USER_LIST)}>
            관심서재 {followingCount}
          </Button>
        }
        bookshelf={
          <Bookshelf
            hasWriteBookReviewItem={false}
            bookReviewList={followingBookReviewList}
            onRefetch={refetchNextFollowingBookReviewList}
          />
        }
      />
      <UserListModal
        userId={myUserId}
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
  const serverSideProps = await checkLogin(ctx);

  if (checkRedirect(serverSideProps) || !serverSideProps.props.userId) {
    return serverSideProps;
  }

  const myUserId = Number(ctx.query.userId);

  const queryClient = await prefetchQuery(
    [getFollowInfoQuery({ targetUserId: myUserId, myUserId })],
    [getFollowingBookReviewListInfinityQuery({ userId: myUserId })],
  );

  return {
    props: { dehydratedState: dehydrate(queryClient), myUserId },
  };
};

export default SubscriptionsPage;

import { GetServerSidePropsContext } from 'next';
import Link from 'next/link';
import { getServerSession } from 'next-auth/next';
import { dehydrate } from '@tanstack/react-query';

import { authOptions } from '@/pages/api/auth/[...nextauth]';
import Home from '@/components/templates/Home';
import SEO from '@/components/atoms/SEO';
import { ArrowRightIcon } from '@/components/atoms/Icon';
import BookReviewScroller from '@/components/organisms/BookReviewScroller';

import { getUserQuery } from '@/services/queries/user';
import prefetchQuery from '@/services/prefetchQuery';
import {
  getFollowingBookReviewListQuery,
  getLatestBookReviewListQuery,
  getMostLikedBookReviewListQuery,
} from '@/services/queries/bookReview';

import useLatestBookReviewList from '@/hooks/services/queries/useLatestBookReviewList';
import useMostLikedBookReviewList from '@/hooks/services/queries/useMostLikedBookReviewList';
import useFollowingBookReviewList from '@/hooks/services/queries/useFollowingBookReviewList';
import Route from '@/constants/routes';
import { UserId } from '@/types/features/user';

const HomePage = ({ myUserId }: { myUserId: UserId | null }) => {
  const latestBookReviewList = useLatestBookReviewList();
  const mostLikedBookReviewList = useMostLikedBookReviewList();
  const followingBookReviewList = useFollowingBookReviewList(
    myUserId || undefined,
  );

  return (
    <>
      <SEO />
      <Home
        latestBookReviewScroller={
          <BookReviewScroller bookReviewList={latestBookReviewList} />
        }
        mostLikedBookReviewScroller={
          <BookReviewScroller bookReviewList={mostLikedBookReviewList} />
        }
        subscribeBookReviewScroller={
          <BookReviewScroller.Subscribe
            bookReviewList={followingBookReviewList}
          />
        }
        subscriptionsPageLink={
          !!myUserId && (
            <Link
              href={`${Route.SUBSCRIPTIONS}`}
              title="관심서재 페이지 이동 링크"
            >
              <ArrowRightIcon size={25} />
            </Link>
          )
        }
      />
    </>
  );
};

export const getServerSideProps = async ({
  req,
  res,
}: GetServerSidePropsContext) => {
  const session = await getServerSession(req, res, authOptions);
  const myUserId = session ? session.id || undefined : undefined;

  const queryClient = await prefetchQuery([
    getUserQuery(myUserId),
    getFollowingBookReviewListQuery(myUserId),
    getLatestBookReviewListQuery,
    getMostLikedBookReviewListQuery,
  ]);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      myUserId: myUserId || null,
    },
  };
};

export default HomePage;

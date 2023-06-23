import { useEffect } from 'react';
import { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth/next';
import { dehydrate } from '@tanstack/react-query';
import Link from 'next/link';

import HomeTemplate from '@/components/templates/Home';
import SEO from '@/components/atoms/SEO';
import { ArrowRightIcon } from '@/components/atoms/Icon';
import BookReviewScroller from '@/components/organisms/BookReviewScroller';
import SubscribeBookReviewScoller from '@/components/organisms/BookReviewScroller/Subscribe';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import prefetchQuery from '@/lib/react-query/prefetchQuery';
import Route from '@/constants/routes';
import { useLayoutContext } from '@/contexts/layoutContext';
import { getUserQuery } from '@/hooks/services/queries/useUser';
import useLatestBookReviewList, {
  latestBookReviewListQuery,
} from '@/hooks/services/queries/useLatestBookReviewList';
import useMostLikedBookReviewList, {
  mostLikedBookReviewListQuery,
} from '@/hooks/services/queries/useMostLikedBookReviewList';
import { getFollowingBookReviewListQuery } from '@/hooks/services/queries/useFollowingBookReviewList';

const HomePage = ({ myUserId }: { myUserId: number | null }) => {
  const { showFooter, hideFooter } = useLayoutContext();
  const { latestBookReviewList } = useLatestBookReviewList();
  const { mostLikedBookReviewList } = useMostLikedBookReviewList();

  useEffect(() => {
    showFooter();
    return () => hideFooter();
  }, [hideFooter, showFooter]);

  return (
    <>
      <SEO />
      <HomeTemplate
        latestBookReviewScroller={
          <BookReviewScroller bookReviewList={latestBookReviewList} />
        }
        mostLikedBookReviewScroller={
          <BookReviewScroller bookReviewList={mostLikedBookReviewList} />
        }
        subscribeBookReviewScroller={<SubscribeBookReviewScoller />}
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
    latestBookReviewListQuery,
    mostLikedBookReviewListQuery,
  ]);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      myUserId: myUserId || null,
    },
  };
};

export default HomePage;

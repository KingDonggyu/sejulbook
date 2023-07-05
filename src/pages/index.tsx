import { useEffect } from 'react';
import { GetServerSidePropsContext } from 'next';
import Link from 'next/link';

import HomeTemplate from '@/components/templates/Home';
import SEO from '@/components/atoms/SEO';
import { ArrowRightIcon } from '@/components/atoms/Icon';
import BookReviewScroller from '@/components/organisms/BookReviewScroller';
import SubscribeBookReviewScoller from '@/components/organisms/BookReviewScroller/Subscribe';

import Route from '@/constants/routes';
import { useLayoutContext } from '@/contexts/layoutContext';
import useLatestBookReviewList from '@/hooks/services/queries/useLatestBookReviewList';
import useMostLikedBookReviewList from '@/hooks/services/queries/useMostLikedBookReviewList';
import checkIsLoggedIn from '@/server/middlewares/checkIsLoggedIn';

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

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { userId } = await checkIsLoggedIn(ctx);
  return { props: { myUserId: userId } };
};

export default HomePage;

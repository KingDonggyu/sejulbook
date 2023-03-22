import { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth/next';
import { dehydrate } from '@tanstack/react-query';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import Home from '@/components/templates/Home';
import DocumentTitle from '@/components/atoms/DocumentTitle';
import BookReviewScroller from '@/components/organisms/BookReviewScroller';
import { getUserQuery } from '@/services/queries/user';
import prefetchQuery from '@/services/prefetchQuery';
import {
  getFollowingBookReviewListQuery,
  getMostLikedBookReviewListQuery,
} from '@/services/queries/bookReview';
import useMostLikedBookReviewList from '@/hooks/services/queries/useMostLikedBookReviewList';
import useFollowingBookReviewList from '@/hooks/services/queries/useFollowingBookReviewList';

const HomePage = () => {
  const mostLikedBookReviewList = useMostLikedBookReviewList();
  const followingBookReviewList = useFollowingBookReviewList();

  return (
    <>
      <DocumentTitle />
      <Home
        mostLikedBookReviewScroller={
          <BookReviewScroller bookReviewList={mostLikedBookReviewList} />
        }
        subscribeBookReviewScroller={
          <BookReviewScroller.Subscribe
            bookReviewList={followingBookReviewList}
          />
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
    getMostLikedBookReviewListQuery,
  ]);

  return {
    props: { dehydratedState: dehydrate(queryClient) },
  };
};

export default HomePage;

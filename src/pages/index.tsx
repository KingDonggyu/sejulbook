import { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth/next';
import { dehydrate } from '@tanstack/react-query';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import Home from '@/components/templates/Home';
import DocumentTitle from '@/components/atoms/DocumentTitle';
import BookReviewScroller from '@/components/organisms/BookReviewScroller';
import { getUserQuery } from '@/services/queries/user';
import prefetchQuery from '@/services/prefetchQuery';
import { getMostLikedBookReviewListQuery } from '@/services/queries/bookReview';
import useMostLikedBookReviewList from '@/hooks/services/queries/useMostLikedBookReviewList';

const HomePage = () => {
  const mostLikedBookReviewList = useMostLikedBookReviewList();

  return (
    <>
      <DocumentTitle />
      <Home
        mostLikedBookReviewScroller={
          <BookReviewScroller bookReviewList={mostLikedBookReviewList} />
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

  if (!session || session.id === null) {
    return {
      props: { dehydratedState: null },
    };
  }

  const queryClient = await prefetchQuery([
    getUserQuery(session.id),
    getMostLikedBookReviewListQuery,
  ]);

  return {
    props: { dehydratedState: dehydrate(queryClient) },
  };
};

export default HomePage;

import { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth';
import { useRouter } from 'next/router';
import { dehydrate } from '@tanstack/react-query';

import { authOptions } from '@/pages/api/auth/[...nextauth]';
import prefetchQuery from '@/services/prefetchQuery';
import { getUserQuery } from '@/services/queries/user';
import { getBookReviewListQuery } from '@/services/queries/bookReview';
import useUser from '@/hooks/services/queries/useUser';

import Library from '@/components/templates/Library';
import DocumentTitle from '@/components/atoms/DocumentTitle';
import Profile from '@/components/organisms/Profile';
import ProfileEditButton from '@/components/molecules/ProfileEditButton';
import BookReivewSort from '@/components/organisms/BookReivewSortButton';
import Bookshelf from '@/components/organisms/Bookshelf';
import useBookReviewList from '@/hooks/services/queries/useBookReviewList';

const LibraryPage = () => {
  const router = useRouter();
  const userId = Number(router.query.id);
  const user = useUser(userId);
  const bookReviewList = useBookReviewList(userId);

  return (
    <>
      <DocumentTitle title={`${user.name}의 서재`} />
      <Library
        profile={<Profile userId={Number(router.query.id)} />}
        profileEditButton={<ProfileEditButton />}
        bookReivewSortButton={<BookReivewSort />}
        bookshelf={
          bookReviewList && <Bookshelf bookReviewList={bookReviewList} />
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
    getBookReviewListQuery(session.id),
  ]);

  return {
    props: { dehydratedState: dehydrate(queryClient) },
  };
};

export default LibraryPage;

import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { dehydrate } from '@tanstack/react-query';

import prefetchQuery from '@/services/prefetchQuery';
import { getUserQuery } from '@/services/queries/user';
import { getBookReviewListQuery } from '@/services/queries/bookReview';
import useUser from '@/hooks/services/queries/useUser';

import Library from '@/components/templates/Library';
import DocumentTitle from '@/components/atoms/DocumentTitle';
import Profile from '@/components/organisms/Profile';
import ProfileEditButton from '@/components/organisms/ProfileEditButton';
import BookReivewSort from '@/components/organisms/BookReivewSortButton';
import Bookshelf from '@/components/organisms/Bookshelf';
import useBookReviewList from '@/hooks/services/queries/useBookReviewList';
import useUserStatus from '@/hooks/useUserStatus';

const LibraryPage = () => {
  const router = useRouter();
  const userId = Number(router.query.id);

  const user = useUser(userId);
  const bookReviewList = useBookReviewList(userId);
  const { session } = useUserStatus();

  const isMyLibrary = Boolean(session && userId === session.id);

  return (
    <>
      <DocumentTitle title={`${user.name}의 서재`} />
      <Library
        profile={
          <Profile
            userId={userId}
            bookReviewCount={bookReviewList ? bookReviewList.length : 0}
          />
        }
        profileEditButton={isMyLibrary && <ProfileEditButton />}
        bookReivewSortButton={<BookReivewSort />}
        bookshelf={
          bookReviewList && (
            <Bookshelf
              isMyBookshelf={isMyLibrary}
              bookReviewList={bookReviewList}
            />
          )
        }
      />
    </>
  );
};

export const getServerSideProps = async ({
  query,
}: GetServerSidePropsContext) => {
  const userId = Number(query.id);

  const queryClient = await prefetchQuery([
    getUserQuery(userId),
    getBookReviewListQuery(userId),
  ]);

  return {
    props: { dehydratedState: dehydrate(queryClient) },
  };
};

export default LibraryPage;

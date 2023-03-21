import { useState } from 'react';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { dehydrate } from '@tanstack/react-query';

import prefetchQuery from '@/services/prefetchQuery';
import { getUserQuery } from '@/services/queries/user';
import { getBookReviewListQuery } from '@/services/queries/bookReview';
import useUser from '@/hooks/services/queries/useUser';
import useBookReviewList from '@/hooks/services/queries/useBookReviewList';
import useUserStatus from '@/hooks/useUserStatus';

import Library from '@/components/templates/Library';
import DocumentTitle from '@/components/atoms/DocumentTitle';
import Profile from '@/components/organisms/Profile';
import ProfileEditButton from '@/components/organisms/ProfileEditButton';
import SortDropdown from '@/components/molecules/SortDropdown';
import Bookshelf from '@/components/organisms/Bookshelf';
import SubscribeButton from '@/components/organisms/SubscribeButton';

const LibraryPage = () => {
  const router = useRouter();
  const userId = Number(router.query.id);

  const user = useUser(userId);
  const { session } = useUserStatus();
  const initBookReviewList = useBookReviewList(userId);

  const [bookReviewList, setBookReviewList] = useState(initBookReviewList);
  const isMyLibrary = !!(session && userId === session.id);

  const handleClickLatestSortButton = () => {
    setBookReviewList(initBookReviewList);
  };

  const handleClickLikeSortButton = () => {
    const list = [...bookReviewList];
    setBookReviewList(list.sort((a, b) => b.likeCount - a.likeCount));
  };

  return (
    <>
      <DocumentTitle title={`${user?.name}의 서재`} />
      <Library
        profile={
          <Profile
            userId={userId}
            bookReviewCount={bookReviewList ? bookReviewList.length : 0}
          />
        }
        bookshelf={
          bookReviewList && (
            <Bookshelf
              isMyBookshelf={isMyLibrary}
              bookReviewList={bookReviewList}
            />
          )
        }
        profileEditButton={
          isMyLibrary ? <ProfileEditButton /> : <SubscribeButton />
        }
        bookReivewSortButton={
          <SortDropdown
            onClickLatestButton={handleClickLatestSortButton}
            onClickLikeSortButton={handleClickLikeSortButton}
          />
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

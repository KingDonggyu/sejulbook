import { useEffect, useState } from 'react';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { getServerSession } from 'next-auth/next';
import { dehydrate } from '@tanstack/react-query';

import prefetchQuery from '@/services/prefetchQuery';
import { getUserQuery } from '@/services/queries/user';
import { getBookReviewListQuery } from '@/services/queries/bookReview';
import useUserStatus from '@/hooks/useUserStatus';
import useUser from '@/hooks/services/queries/useUser';
import useBookReviewList from '@/hooks/services/queries/useBookReviewList';
import useFollowInfo from '@/hooks/services/queries/useFollowInfo';

import Library from '@/components/templates/Library';
import DocumentTitle from '@/components/atoms/DocumentTitle';
import Profile from '@/components/organisms/Profile';
import ProfileEditButton from '@/components/organisms/ProfileEditButton';
import SortDropdown from '@/components/molecules/SortDropdown';
import Bookshelf from '@/components/organisms/Bookshelf';
import SubscribeButton from '@/components/organisms/SubscribeButton';
import { getFollowInfoQuery } from '@/services/queries/follow';
import { BookReivewList } from '@/types/features/bookReview';
import { authOptions } from '../api/auth/[...nextauth]';

const LibraryPage = () => {
  const router = useRouter();
  const userId = Number(router.query.id);

  const user = useUser(userId);
  const { session } = useUserStatus();
  const initBookReviewList = useBookReviewList(userId);
  const { followerCount, followingCount, isFollow } = useFollowInfo(userId);

  const [bookReviewList, setBookReviewList] = useState<BookReivewList>([]);
  const isMyLibrary = !!(session && userId === session.id);

  useEffect(() => {
    setBookReviewList(initBookReviewList);
  }, [initBookReviewList]);

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
            followerCount={followerCount}
            followingCount={followingCount}
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
          isMyLibrary ? (
            <ProfileEditButton />
          ) : (
            <SubscribeButton userId={userId} isSubscribed={isFollow} />
          )
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
  req,
  res,
  query,
}: GetServerSidePropsContext) => {
  const userId = Number(query.id);
  const session = await getServerSession(req, res, authOptions);
  const myId = session ? session.id || undefined : undefined;

  const queryClient = await prefetchQuery([
    getUserQuery(userId),
    getBookReviewListQuery(userId),
    getFollowInfoQuery({ targetUserId: userId, myUserId: myId }),
  ]);

  return {
    props: { dehydratedState: dehydrate(queryClient) },
  };
};

export default LibraryPage;

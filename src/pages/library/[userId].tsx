import { useEffect, useState } from 'react';
import { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth/next';
import { dehydrate } from '@tanstack/react-query';

import type { GetLibraryBookReviewResponse, UserId } from 'bookReview';
import prefetchQuery from '@/lib/react-query/prefetchQuery';
import useUserStatus from '@/hooks/useUserStatus';
import useUser, { getUserQuery } from '@/hooks/services/queries/useUser';
import useBookReviewList, {
  getBookReviewListQuery,
} from '@/hooks/services/queries/useBookReviewList';
import useFollowInfo, {
  getFollowInfoQuery,
} from '@/hooks/services/queries/useFollowInfo';

import Library from '@/components/templates/Library';
import SEO from '@/components/atoms/SEO';
import Profile from '@/components/organisms/Profile';
import ProfileEditButton from '@/components/organisms/ProfileEditButton';
import SortDropdown from '@/components/molecules/SortDropdown';
import Bookshelf from '@/components/organisms/Bookshelf';
import SubscribeToggleButton from '@/components/organisms/SubscribeToggleButton';
import Route from '@/constants/routes';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

const LibraryPage = ({ userId }: { userId: UserId }) => {
  const { user } = useUser(userId);
  const { followInfo } = useFollowInfo(userId);
  const { bookReviewList: initBookReviewList } = useBookReviewList(userId);
  const { session, isLogin } = useUserStatus();

  const [bookReviewList, setBookReviewList] = useState(
    initBookReviewList || [],
  );

  if (!user || !initBookReviewList || !followInfo) {
    return null;
  }

  const isMyLibrary = !!(isLogin && userId === session.id);

  const handleClickLatestSortButton = () => {
    setBookReviewList(initBookReviewList);
  };

  const handleClickLikeSortButton = () => {
    const list = [...bookReviewList];
    setBookReviewList(list.sort((a, b) => b.likeCount - a.likeCount));
  };

  return (
    <>
      <SEO
        title={user ? `${user.name}의 서재` : undefined}
        description={
          user
            ? `${user.name}의 서재 ${!!user.introduce && `- ${user.introduce}`}`
            : undefined
        }
        url={`${Route.LIBRARY}/${userId}`}
      />
      <Library
        hasUser={!!user}
        profile={
          <Profile
            userId={userId}
            bookReviewCount={bookReviewList ? bookReviewList.length : 0}
            {...followInfo}
          />
        }
        bookshelf={
          bookReviewList && (
            <Bookshelf
              hasWriteBookReviewItem={isMyLibrary}
              bookReviewList={bookReviewList}
            />
          )
        }
        profileEditButton={
          isMyLibrary ? (
            <ProfileEditButton />
          ) : (
            <SubscribeToggleButton
              userId={userId}
              isSubscribed={followInfo.isFollow}
            />
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

interface ExtendedGetServerSidePropsContext
  extends Omit<GetServerSidePropsContext, 'query'> {
  query: {
    userId: string;
  };
}

export const getServerSideProps = async ({
  req,
  res,
  query,
}: ExtendedGetServerSidePropsContext) => {
  const session = await getServerSession(req, res, authOptions);
  const myUserId = session ? session.id || undefined : undefined;
  const targetUserId = +query.userId;

  const queryClient = await prefetchQuery([
    getUserQuery(targetUserId),
    getBookReviewListQuery(targetUserId),
    getFollowInfoQuery({ targetUserId, myUserId }),
  ]);

  return {
    props: { dehydratedState: dehydrate(queryClient), userId: targetUserId },
  };
};

export default LibraryPage;

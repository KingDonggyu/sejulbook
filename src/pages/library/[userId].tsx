import { useEffect, useState } from 'react';
import { GetServerSidePropsContext } from 'next';
import { dehydrate } from '@tanstack/react-query';

import type { GetLibraryBookReviewResponse, UserId } from 'bookReview';
import prefetchQuery from '@/lib/react-query/prefetchQuery';
import useUser, { getUserQuery } from '@/hooks/services/queries/useUser';
import useBookReviewList from '@/hooks/services/queries/useBookReviewList';
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
import { userError } from '@/constants/message';
import checkIsLoggedIn from '@/server/middlewares/checkIsLoggedIn';

const LibraryPage = ({
  targetUserId,
  myUserId,
}: {
  targetUserId: UserId;
  myUserId?: UserId;
}) => {
  const { user } = useUser(targetUserId);
  const { followInfo } = useFollowInfo(targetUserId);

  const { bookReviewList: initBookReviewList, isLoading } =
    useBookReviewList(targetUserId);

  const [bookReviewList, setBookReviewList] = useState<
    GetLibraryBookReviewResponse[]
  >([]);

  useEffect(() => {
    if (initBookReviewList) {
      setBookReviewList(initBookReviewList);
    }
  }, [initBookReviewList]);

  if (!user || !followInfo) {
    return null;
  }

  const isMyLibrary = !!(myUserId && targetUserId === myUserId);

  const handleClickLatestSortButton = () => {
    if (initBookReviewList) {
      setBookReviewList(initBookReviewList);
    }
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
        url={`${Route.LIBRARY}/${targetUserId}`}
      />
      <Library
        hasUser={!!user}
        profile={
          <Profile
            userId={targetUserId}
            bookReviewCount={bookReviewList ? bookReviewList.length : 0}
            {...followInfo}
          />
        }
        bookshelf={
          <Bookshelf
            showSkeleton={isLoading}
            hasWriteBookReviewItem={isMyLibrary}
            bookReviewList={bookReviewList}
          />
        }
        profileEditButton={
          isMyLibrary ? (
            <ProfileEditButton />
          ) : (
            <SubscribeToggleButton
              userId={targetUserId}
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

export const getServerSideProps = async (
  ctx: ExtendedGetServerSidePropsContext,
) => {
  try {
    const { userId } = await checkIsLoggedIn(ctx);
    const myUserId = userId || undefined;
    const targetUserId = +ctx.query.userId;

    const queryClient = await prefetchQuery([
      getUserQuery(targetUserId),
      getFollowInfoQuery({ targetUserId, myUserId }),
    ]);

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
        targetUserId,
        myUserId,
      },
    };
  } catch {
    return {
      props: {
        notFound: true,
        title: userError.NOT_FOUND,
        errorMessage: '404 - User is not Found',
      },
    };
  }
};

export default LibraryPage;

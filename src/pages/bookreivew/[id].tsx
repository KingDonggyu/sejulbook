import { useRef } from 'react';
import { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth/next';
import { useRouter } from 'next/router';
import { dehydrate } from '@tanstack/react-query';

import BookReviewTemplate from '@/components/templates/BookReivew';
import SEO from '@/components/atoms/SEO';
import SejulTextArea from '@/components/organisms/SejulTextarea';
import ContentEditor from '@/components/organisms/ContentEditor';
import Rating from '@/components/molecules/Rating';
import TagList from '@/components/molecules/TagList';
import EditDeleteButtonSet from '@/components/molecules/EditDeleteButtonSet';
import CommentContainer from '@/components/organisms/CommentContainer';
import LikeCommentWidget from '@/components/organisms/LikeCommentWidget';
import BookInfoBox from '@/components/organisms/BookInfoBox';
import prefetchQuery from '@/lib/react-query/prefetchQuery';
import Route from '@/constants/routes';
import { bookReviewError, confirm } from '@/constants/message';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

import useBookReview, {
  getBookReviewQuery,
} from '@/hooks/services/queries/useBookReview';
import useComments, {
  getCommentsQuery,
} from '@/hooks/services/queries/useComments';
import useTags, { getTagsQuery } from '@/hooks/services/queries/useTags';
import { getLikeStatusQuery } from '@/hooks/services/queries/useLikeStatus';
import { getUserQuery } from '@/hooks/services/queries/useUser';
import useUserStatus from '@/hooks/useUserStatus';
import useBookReviewDeletion from '@/hooks/services/mutations/useBookReviewDeletion';

const BookreviewPage = () => {
  const router = useRouter();
  const bookReviewId = Number(router.query.id);
  const commentRef = useRef<HTMLDivElement>(null);

  const { session, isLogin } = useUserStatus();
  const userId = isLogin ? session.id : undefined;

  const { bookReview } = useBookReview(bookReviewId, true);
  const { tags } = useTags(bookReviewId);
  const { comments } = useComments(bookReviewId);

  const deleteBookReview = useBookReviewDeletion({
    onSuccess: () => {
      if (userId) {
        router.replace(`${Route.LIBRARY}/${userId}`);
        return;
      }
      router.replace(Route.HOME);
    },
  });

  if (!bookReview || !comments) {
    return null;
  }

  const isMyBookReview = userId === bookReview.userId;

  const handleClickDeleteButton = () => {
    if (isMyBookReview && window.confirm(confirm.DELETE_BOOKREVIEW)) {
      deleteBookReview(bookReviewId);
    }
  };

  const handleClickEditButton = () => {
    router.push({
      pathname: `${Route.NEWBOOK_WRITE}`,
      query: { publish: bookReviewId },
    });
  };

  const handleClickCommentButton = () => {
    commentRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleClickTagButton = (tag: string) => {
    router.push({
      pathname: Route.SEARCH_RESULT_BY_TAG,
      query: { q: tag },
    });
  };

  return (
    <>
      <SEO
        title={bookReview.bookname}
        description={bookReview.sejul}
        image={bookReview.thumbnail}
        url={`${Route.BOOKREVIEW}/${bookReview.id}`}
      />
      <BookReviewTemplate
        bookReivew={bookReview}
        editDeleteButtonSet={
          <EditDeleteButtonSet
            isShowDeleteButton={isMyBookReview}
            isShowEditButton={isMyBookReview}
            onClickDeleteButton={handleClickDeleteButton}
            onClickEditButton={handleClickEditButton}
          />
        }
        likeCommentWidget={
          <LikeCommentWidget
            bookReviewId={bookReviewId}
            commentCount={comments.length}
            onClickCommentButton={handleClickCommentButton}
          />
        }
        sejulViewer={<SejulTextArea value={bookReview.sejul} readonly />}
        contentViewer={
          <ContentEditor initialValue={bookReview.content} readonly />
        }
        bookInfoButton={
          <BookInfoBox.Button
            title={bookReview.bookname}
            authors={bookReview.authors}
            thumbnail={bookReview.originThumbnail}
            publisher={bookReview.publisher}
            datetime={bookReview.publication}
          >
            책정보
          </BookInfoBox.Button>
        }
        ratingViewer={
          <Rating init={Number(bookReview.rating)} size={17} gap={3} readonly />
        }
        tagList={
          tags && (
            <TagList
              tags={tags.map(({ tag }) => tag)}
              onClickTag={handleClickTagButton}
            />
          )
        }
        comment={
          <div ref={commentRef}>
            <CommentContainer
              bookReviewId={bookReviewId}
              comments={comments}
              isMyBookReview={isMyBookReview}
            />
          </div>
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
  try {
    const session = await getServerSession(req, res, authOptions);
    const userId = session ? session.id || undefined : undefined;
    const bookReviewId = Number(query.id);

    const queryClient = await prefetchQuery([
      getUserQuery(userId),
      getBookReviewQuery(bookReviewId, true),
      getTagsQuery(bookReviewId),
      getCommentsQuery(bookReviewId),
      getLikeStatusQuery({ likerId: userId, bookReviewId }),
    ]);

    return {
      props: { dehydratedState: dehydrate(queryClient), notFound: false },
    };
  } catch {
    return {
      props: {
        notFound: true,
        title: bookReviewError.NOT_FOUND,
        errorMessage: '404 - Bookreview is not Found',
      },
    };
  }
};

export default BookreviewPage;

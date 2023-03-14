import { useRef } from 'react';
import { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth/next';
import { useRouter } from 'next/router';
import { dehydrate } from '@tanstack/react-query';

import BookReviewTemplate from '@/components/templates/BookReivew';
import DocumentTitle from '@/components/atoms/DocumentTitle';
import SejulTextArea from '@/components/organisms/SejulTextarea';
import ContentEditor from '@/components/organisms/ContentEditor';
import Rating from '@/components/molecules/Rating';
import TagList from '@/components/molecules/TagList';
import EditDeleteButtonSet from '@/components/molecules/EditDeleteButtonSet';
import CommentContainer from '@/components/organisms/CommentContainer';
import LikeCommentWidget from '@/components/organisms/LikeCommentWidget';
import BookInfoBox from '@/components/organisms/BookInfoBox';

import {
  getBookReviewQuery,
  getTagsQuery,
} from '@/services/queries/bookReview';
import { getUserQuery } from '@/services/queries/user';
import { getCommentsQuery } from '@/services/queries/comment';
import { getLikeStatusQuery } from '@/services/queries/like';
import prefetchQuery from '@/services/prefetchQuery';

import useBookReview from '@/hooks/services/queries/useBookReview';
import useTags from '@/hooks/services/queries/useTags';
import useComments from '@/hooks/services/queries/useComments';
import useLikeStatus from '@/hooks/services/queries/useLike';
import useUserStatus from '@/hooks/useUserStatus';
import useBookReviewDeletion from '@/hooks/services/mutations/useBookReviewDeletion';

import Route from '@/constants/routes';
import { PublishedBookReviewURLQuery } from '@/types/features/bookReview';
import { authOptions } from '../api/auth/[...nextauth]';

const BookreviewPage = () => {
  const router = useRouter();
  const bookReviewId = Number(router.query.id);
  const commentRef = useRef<HTMLDivElement>(null);

  const { session } = useUserStatus();
  const userId = session ? session.id || undefined : undefined;

  const bookReview = useBookReview(bookReviewId);
  const tags = useTags(bookReviewId);
  const comments = useComments(bookReviewId);
  const { likeCount } = useLikeStatus({ userId, bookReviewId });

  const deleteBookReview = useBookReviewDeletion({
    bookReviewId,
    onSuccess: () => {
      if (userId) {
        router.replace(`${Route.LIBRARY}/${userId}`);
        return;
      }
      router.replace(Route.HOME);
    },
  });

  const isMyBookReview = !!(userId && userId === bookReview?.userId);

  const handleClickDeleteButton = () => {
    if (isMyBookReview && window.confirm('독후감을 정말 삭제하시겠습니까?')) {
      deleteBookReview();
    }
  };

  const handleClickEditButton = () => {
    const query: PublishedBookReviewURLQuery = {
      publish: bookReviewId,
    };
    router.push({
      pathname: `${Route.NEWBOOK_WRITE}`,
      query,
    });
  };

  const handleClickCommentButton = () => {
    commentRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (!bookReview) {
    return null;
  }

  return (
    <>
      <DocumentTitle title={bookReview.bookname} />
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
            likeCount={likeCount}
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
        tagList={tags && <TagList tags={tags} />}
        comment={
          <div ref={commentRef}>
            <CommentContainer bookReviewId={bookReviewId} comments={comments} />
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
  const session = await getServerSession(req, res, authOptions);
  const userId = session ? session.id || undefined : undefined;

  const bookReviewId = Number(query.id);
  const queries = [
    getBookReviewQuery(bookReviewId),
    getTagsQuery(bookReviewId),
    getCommentsQuery(bookReviewId),
    getLikeStatusQuery({ userId, bookReviewId }),
  ];

  if (userId) {
    queries.push(getUserQuery(userId));
  }

  const queryClient = await prefetchQuery(queries);

  return {
    props: { dehydratedState: dehydrate(queryClient) },
  };
};

export default BookreviewPage;

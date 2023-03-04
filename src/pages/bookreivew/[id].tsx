import { useRef } from 'react';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { dehydrate } from '@tanstack/react-query';

import BookReviewTemplate from '@/components/templates/BookReivew';
import DocumentTitle from '@/components/atoms/DocumentTitle';
import SejulTextArea from '@/components/organisms/SejulTextarea';
import ContentEditor from '@/components/organisms/ContentEditor';
import Rating from '@/components/molecules/Rating';
import TagList from '@/components/molecules/TagList';
import CommentContainer from '@/components/organisms/CommentContainer';
import LikeCommentWidget from '@/components/organisms/LikeCommentWidget';
import BookInfoBox from '@/components/organisms/BookInfoBox';

import {
  getBookReviewQuery,
  getTagsQuery,
} from '@/services/queries/bookReview';
import prefetchQuery from '@/services/prefetchQuery';
import useBookReview from '@/hooks/services/queries/useBookReview';
import useTags from '@/hooks/services/queries/useTags';
import useComments from '@/hooks/services/queries/useComments';
import { getCommentsQuery } from '@/services/queries/comment';

const BookreviewPage = () => {
  const router = useRouter();
  const bookReviewId = Number(router.query.id);
  const commentRef = useRef<HTMLDivElement>(null);

  const bookReview = useBookReview(bookReviewId);
  const tags = useTags(bookReviewId);
  const comments = useComments(bookReviewId);

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
        likeCommentWidget={
          <LikeCommentWidget
            likeCount={bookReview.likeCount}
            commentCount={comments.length}
            handleClickLikeButton={() => {}}
            handleClickCommentButton={handleClickCommentButton}
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
            <CommentContainer comments={comments} />
          </div>
        }
      />
    </>
  );
};

export const getServerSideProps = async ({
  query,
}: GetServerSidePropsContext) => {
  const bookReviewId = Number(query.id);

  const queryClient = await prefetchQuery([
    getBookReviewQuery(bookReviewId),
    getTagsQuery(bookReviewId),
    getCommentsQuery(bookReviewId),
  ]);

  return {
    props: { dehydratedState: dehydrate(queryClient) },
  };
};

export default BookreviewPage;

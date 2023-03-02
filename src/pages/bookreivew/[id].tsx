import { useRef } from 'react';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { getServerSession } from 'next-auth';
import { dehydrate } from '@tanstack/react-query';

import BookReviewTemplate from '@/components/templates/BookReivew';
import SejulTextArea from '@/components/organisms/SejulTextarea';
import ContentEditor from '@/components/organisms/ContentEditor';
import Rating from '@/components/molecules/Rating';
import TagList from '@/components/molecules/TagList';
import CommentContainer from '@/components/organisms/CommentContainer';
import LikeCommentWidget from '@/components/organisms/LikeCommentWidget';
import BookInfoBox from '@/components/organisms/BookInfoBox';

import { BookReviewResponse } from '@/types/features/bookReview';
import { Tag } from '@/types/features/tag';
import { Comment } from '@/types/features/comment';
import prefetchQuery from '@/utils/prefetchQuery';
import {
  getBookReviewQuery,
  getTagsQuery,
} from '@/services/queries/bookReview';
import useQuery from '@/hooks/useQuery';
import { authOptions } from '../api/auth/[...nextauth]';

const comments: Comment[] = [
  {
    writer: '동쪽별',
    content: '잘 읽었습니다',
    createdAt: '2023-02-11T13:00:00',
  },
  {
    writer: '강무진',
    content: '감동이네요',
    createdAt: '2023-02-12T09:00:00',
  },
  {
    writer: '배준형',
    content: '별로네요..',
    createdAt: '2023-02-12T19:00:00',
  },
];

const BookreviewPage = () => {
  const router = useRouter();
  const bookReviewId = Number(router.query.id);
  const commentRef = useRef<HTMLDivElement>(null);

  const { data: bookReview } = useQuery<BookReviewResponse>(
    getBookReviewQuery(bookReviewId),
  );

  const { data: tags } = useQuery<Tag[]>(getTagsQuery(bookReviewId));

  const handleClickCommentButton = () => {
    commentRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (!bookReview) {
    return null;
  }

  return (
    <BookReviewTemplate
      bookReivew={bookReview}
      likeCommentWidget={
        <LikeCommentWidget
          likeCount={bookReview.likeCount}
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
          thumbnail={bookReview.thumbnail}
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
  );
};

export const getServerSideProps = async ({
  req,
  res,
  query,
}: GetServerSidePropsContext) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session || session.id === null) {
    return {
      props: { dehydratedState: null },
    };
  }

  const queryClient = await prefetchQuery([
    getBookReviewQuery(Number(query.id)),
    getTagsQuery(Number(query.id)),
  ]);

  return {
    props: { dehydratedState: dehydrate(queryClient) },
  };
};

export default BookreviewPage;

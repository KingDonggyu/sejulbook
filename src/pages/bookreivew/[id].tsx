import { useRef } from 'react';
import BookReviewTemplate from '@/components/templates/BookReivew';
import SejulTextArea from '@/components/organisms/SejulTextarea';
import ContentEditor from '@/components/organisms/ContentEditor';
import Rating from '@/components/molecules/Rating';
import TagList from '@/components/molecules/TagList';
import CommentContainer from '@/components/organisms/CommentContainer';
import LikeCommentWidget from '@/components/organisms/LikeCommentWidget';
import { BookReviewPost } from '@/types/features/bookReview';
import BookInfoBox from '@/components/organisms/BookInfoBox';
import { Comment } from '@/types/features/comment';

const sejul = `"익숙하고 안전한 길 대신 낯설고 불확실한 길을 선택하는 이유는 나의 가치와 가능성을 발견하며 나답게 살고 싶기 때문이다."\n
  "오늘이 인생의 마지막 날이라면 이미 실패한 일을 후회할 것인가, 아니면 시도하지 않은 일을 후회할 것인가?"\n
  "시도하지 않을 바에야 차라리 실패를 하자."`;

const content = `
  <h1>세 줄 독후감</h1>
  <p>안녕하세요 세 줄 독후감입니다.</p>
  <p><span style="color: rgb(224, 62, 45);">안녕하세요 세 줄 독후감입니다.</span></p>
  <p>&nbsp;</p>
  <p><img src="https://image.kmib.co.kr/online_image/2021/0903/2021090220380531799_1630582685_0924207731.jpg" alt="살며 사랑하며] 책정리 하는 척 - 국민일보" width="490" height="342"></p>`;

const thumbnail =
  'https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F5736362%3Ftimestamp%3D20221108003715';

const bookReview: BookReviewPost = {
  book: {
    title: '없던 오늘',
    authors: ['유병욱'],
    publisher: '북하우스',
    datetime: '2021-06-21T00:00:00.000+09:00',
    thumbnail,
  },
  category: { id: 0, category: '자기계발' },
  rating: 4,
  tag: new Set(['세줄독후감', '없던오늘', '유병욱']),
  thumbnail,
  sejul,
  content,
  writer: 'choi',
  createdAt: '2021-06-21T00:00:00.000+09:00',
};

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
  const commentRef = useRef<HTMLDivElement>(null);

  const handleClickCommentButton = () => {
    commentRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <BookReviewTemplate
      bookReivew={bookReview}
      likeCommentWidget={
        <LikeCommentWidget
          handleClickLikeButton={() => {}}
          handleClickCommentButton={handleClickCommentButton}
        />
      }
      sejulViewer={<SejulTextArea value={bookReview.sejul} readonly />}
      contentViewer={
        <ContentEditor initialValue={bookReview.content} readonly />
      }
      bookInfoButton={
        <BookInfoBox.Button {...bookReview.book}>책정보</BookInfoBox.Button>
      }
      ratingViewer={<Rating size={17} gap={3} readonly />}
      tagList={<TagList tag={Array.from(bookReview.tag)} />}
      comment={
        <div ref={commentRef}>
          <CommentContainer comments={comments} />
        </div>
      }
    />
  );
};

export default BookreviewPage;

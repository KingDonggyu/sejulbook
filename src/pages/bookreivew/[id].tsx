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

const content = `<p><img style="display: block; margin-left: auto; margin-right: auto;" src="https://sejulbook.s3.ap-northeast-2.amazonaws.com/469cc720b6bc11edbd40411a8cf07f05.png" width="383" height="511"></p>
<p data-ke-size="size16">이번에 소개할 책은&nbsp;<strong>천인우님의 '브레이킹 루틴'</strong>입니다.&nbsp;</p>
<p data-ke-size="size16">이 책을 단 한 문장으로 요약한다면 다음과 같아요.</p>
<p data-ke-size="size16"><span style="color: rgb(22, 145, 121);"><strong>"변화 없는 삶을 깨뜨리기 위해 걱정과 두려움에서 벗어나 용기있는 도전을 하는 것"</strong></span></p>
<p data-ke-size="size16">이는 제가 평소 가장 중요시 여기는&nbsp;<strong>'실패를 두려워하지 않는 용기'</strong>&nbsp;덕목과 일치하기에 많은 공감을 하면서 책을 읽을 수 있었습니다.</p>
<p data-ke-size="size16">&nbsp;</p>
<p data-ke-size="size16"><img style="display: block; margin-left: auto; margin-right: auto;" src="https://sejulbook.s3.ap-northeast-2.amazonaws.com/b18e8e10b6bc11edbd40411a8cf07f05.png" width="364" height="485"></p>
<p data-ke-size="size16">이 뿐만 아니라 이 책은&nbsp;<strong>'공부 습관'</strong>,&nbsp;<strong>'시간 관리법'</strong>,&nbsp;<strong>'취업&middot;입학 준비 팁'</strong>을 저자의 경험을 토대로 소개합니다.</p>
<p data-ke-size="size16">덕분에 저의 평소 시간 관리법에 대해 반성할 수 있었고, 취업 준비에 대한 마음가짐을 달리할 수 있었습니다.</p>
<p data-ke-size="size16">또한&nbsp;<strong>"열심히 공부하고 일해온 지난 노력은 결국 무엇을 위한 것인가?"</strong>라는 질문을 스스로에게 해봄으로써 자기성찰하는 값진 시간을 가지기도 했습니다.</p>
<p data-ke-size="size16">너무나도 좋았던, 자극이 많이 되었던 책이었습니다 👍</p>`;

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

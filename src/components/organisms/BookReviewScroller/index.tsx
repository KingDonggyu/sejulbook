import CardScoller from '@/components/molecules/CardScroller';
import { ModalKey } from '@/constants/keys';
import useUserStatus from '@/hooks/useUserStatus';
import { HomeBookReviewSummary } from '@/types/features/bookReview';
import { LoginButton } from '../AccountButton';
import SejulThumbnail from '../SejulThumbnail';
import * as s from './style';

interface BookReviewScrollerProps {
  bookReviewList: HomeBookReviewSummary[];
}

const BookReviewScroller = ({ bookReviewList }: BookReviewScrollerProps) => {
  if (!bookReviewList.length) {
    return (
      <s.AltWrapper>
        <s.BookReviewListAltText>
          최근 좋아요를 받은 독후감이 없습니다.
        </s.BookReviewListAltText>
      </s.AltWrapper>
    );
  }

  return (
    <CardScoller css={s.bookReviewListStyle}>
      {bookReviewList.map(({ id, bookname, sejul, thumbnail, writer }) => (
        <SejulThumbnail
          key={id}
          bookReviewId={id}
          sejul={sejul}
          src={thumbnail}
          alt={`${bookname} 책 표지 이미지`}
          defaultFilter="brightness(0.5)"
          isHiddenChildren
          isLargeSejul
          width={300}
          height={400}
        >
          <s.ContentWrapper>
            <s.Content>
              <s.Writer>{writer}의 세 줄</s.Writer>
              <s.BookName>&apos;{bookname}&apos;</s.BookName>
            </s.Content>
          </s.ContentWrapper>
        </SejulThumbnail>
      ))}
    </CardScoller>
  );
};

const SubscribeBookReviewScoller = ({
  bookReviewList,
}: BookReviewScrollerProps) => {
  const { isLogin } = useUserStatus();

  if (!isLogin) {
    return (
      <s.AltWrapper>
        <s.BookReviewListAltText>
          관심있는 서재의 독후감을 확인하려면 로그인하세요
        </s.BookReviewListAltText>
        <LoginButton
          radius={20}
          modalKey={ModalKey.ALT_LOGIN}
          css={s.loginButtonStyle}
          title="세 줄 독후감 시작하기"
        />
      </s.AltWrapper>
    );
  }

  if (!bookReviewList.length) {
    return (
      <s.AltWrapper>
        <s.BookReviewListAltText>
          관심 서재 독후감이 없습니다
        </s.BookReviewListAltText>
      </s.AltWrapper>
    );
  }

  return <BookReviewScroller bookReviewList={bookReviewList} />;
};

BookReviewScroller.Subscribe = SubscribeBookReviewScoller;

export default BookReviewScroller;

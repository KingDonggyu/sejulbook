import useFollowingBookReviewList from '@/hooks/services/queries/useFollowingBookReviewList';
import { ModalKey } from '@/constants/keys';
import { LoginButton } from '../AccountButton';
import BookReviewScroller from '.';
import * as s from './style';

const SubscribeBookReviewScoller = () => {
  const { followingBookReviewList } = useFollowingBookReviewList();

  if (followingBookReviewList === null) {
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

  if (followingBookReviewList && !followingBookReviewList.length) {
    return (
      <s.AltWrapper>
        <s.BookReviewListAltText>
          관심 서재 독후감이 없습니다
        </s.BookReviewListAltText>
      </s.AltWrapper>
    );
  }

  return <BookReviewScroller bookReviewList={followingBookReviewList} />;
};

export default SubscribeBookReviewScoller;

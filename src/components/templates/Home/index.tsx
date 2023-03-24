import { ReactNode } from 'react';
import Image from 'next/image';
import quotesLeftSrc from '@public/images/icon-white-quotes-left.svg';
import quotesRightSrc from '@public/images/icon-white-quotes-right.svg';
import * as s from './style';

interface HomeProps {
  mostLikedBookReviewScroller: ReactNode;
  subscribeBookReviewScroller: ReactNode;
  subscriptionsPageLink: ReactNode;
}

const Home = ({
  mostLikedBookReviewScroller,
  subscribeBookReviewScroller,
  subscriptionsPageLink,
}: HomeProps) => (
  <s.Wrapper>
    <s.Banner>
      <s.BannerContent>
        <Image src={quotesLeftSrc} alt="왼쪽 큰따옴표 아이콘" />
        <s.Title>세 줄로 마음을 정리해요</s.Title>
        <s.SubTitle>세 줄로 마음을 정리해요</s.SubTitle>
        <s.SubTitle>세 줄로 마음을 정리해요</s.SubTitle>
        <Image src={quotesRightSrc} alt="오른쪽 큰따옴표 아이콘" />
      </s.BannerContent>
    </s.Banner>
    <div>
      <s.BookReviewListLabel>
        사람들의 마음을 얻은 <span>세 줄</span>
      </s.BookReviewListLabel>
      {mostLikedBookReviewScroller}
    </div>
    <div>
      <s.SubscribeLabelWrapper>
        <s.BookReviewListLabel>
          당신의 마음을 얻은 <span>서재</span>
        </s.BookReviewListLabel>
        {subscriptionsPageLink}
      </s.SubscribeLabelWrapper>
      {subscribeBookReviewScroller}
    </div>
  </s.Wrapper>
);

export default Home;

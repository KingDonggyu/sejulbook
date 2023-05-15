import { ReactNode } from 'react';
import Image from 'next/image';
import quotesLeftSrc from '@public/images/icon-white-quotes-left.svg';
import quotesRightSrc from '@public/images/icon-white-quotes-right.svg';
import * as s from './style';

interface HomeProps {
  latestBookReviewScroller: ReactNode;
  mostLikedBookReviewScroller: ReactNode;
  subscribeBookReviewScroller: ReactNode;
  subscriptionsPageLink: ReactNode;
}

const Home = ({
  latestBookReviewScroller,
  mostLikedBookReviewScroller,
  subscribeBookReviewScroller,
  subscriptionsPageLink,
}: HomeProps) => (
  <s.Wrapper>
    <s.Banner>
      <s.BannerContent>
        <Image
          src={quotesLeftSrc}
          alt="왼쪽 큰따옴표 아이콘"
          style={{ width: 'auto', height: 'auto' }}
        />
        <s.Title>의미있는 책을 담는 공간,</s.Title>
        <s.SubTitle>부담없이 책을 기록하는 공간,</s.SubTitle>
        <s.SubTitle>당신에게 그런 공간이 되기를.</s.SubTitle>
        <Image
          src={quotesRightSrc}
          alt="오른쪽 큰따옴표 아이콘"
          style={{ width: 'auto', height: 'auto' }}
        />
      </s.BannerContent>
    </s.Banner>
    <div>
      <s.BookReviewListLabel>
        따끈따끈한 <span>세 줄</span>
      </s.BookReviewListLabel>
      {latestBookReviewScroller}
    </div>
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

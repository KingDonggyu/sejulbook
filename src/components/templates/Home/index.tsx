import Image from 'next/image';
import quotesLeftSrc from '@public/images/icon-white-quotes-left.svg';
import quotesRightSrc from '@public/images/icon-white-quotes-right.svg';
import * as s from './style';

const Home = () => (
  <div>
    <s.Banner>
      <s.BannerContent>
        <Image src={quotesLeftSrc} alt="왼쪽 큰따옴표 아이콘" />
        <s.Title>세 줄로 마음을 정리해요</s.Title>
        <s.SubTitle>세 줄로 마음을 정리해요</s.SubTitle>
        <s.SubTitle>세 줄로 마음을 정리해요</s.SubTitle>
        <Image src={quotesRightSrc} alt="오른쪽 큰따옴표 아이콘" />
      </s.BannerContent>
    </s.Banner>
  </div>
);

export default Home;

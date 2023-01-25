import Image from 'next/image';
import { AiFillStar } from '@react-icons/all-files/ai/AiFillStar';
import { FaComment } from '@react-icons/all-files/fa/FaComment';
import { FaHeart } from '@react-icons/all-files/fa/FaHeart';
import { lightTheme } from '@/styles/theme';
import { BookThumbnailStyle } from '@/styles/common';
import * as s from './style';

const BookReviewItem = () => (
  <s.Wrapper>
    <s.ThumnailWrapper>
      <Image
        src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbfiCtu%2FbtrGS4A2l6Y%2FtY8QoI1vSxYGl2tQrQkaH1%2Fimg.png"
        alt="책 섬네일 이미지"
        width={BookThumbnailStyle.DEFAULT_WIDTH}
        height={BookThumbnailStyle.DEFAULT_HEIGHT}
        css={s.thumbnailStyle}
      />
      <s.TuhumnailBottomWrapper>
        <div>
          <FaHeart color={lightTheme.COLOR.RUBY} size={10} />
          <s.LikeCount>25</s.LikeCount>
        </div>
        <div>
          <FaComment size={10} />
          <s.CommentCount>10</s.CommentCount>
        </div>
      </s.TuhumnailBottomWrapper>
    </s.ThumnailWrapper>
    <s.Title>브레이킹 루틴</s.Title>
    <s.Author>천인우 지음</s.Author>
    <s.Rating>
      {Array.from(Array(5), (_, key) => (
        <AiFillStar key={key} color={lightTheme.COLOR.PRIMARY} />
      ))}
    </s.Rating>
    <s.Date>2023.01.10</s.Date>
  </s.Wrapper>
);

export default BookReviewItem;

import { useRef, useState } from 'react';
import Image from 'next/image';
// import { AiFillStar } from '@react-icons/all-files/ai/AiFillStar';
import { FaComment } from '@react-icons/all-files/fa/FaComment';
import { FaHeart } from '@react-icons/all-files/fa/FaHeart';
import testThumbnailSrc from '@public/images/test-thumbnail.jpeg';
import { lightTheme } from '@/styles/theme';
import * as s from './style';

const sejul = `"익숙하고 안전한 길 대신 낯설고 불확실한 길을 선택하는 이유는 나의 가치와 가능성을 발견하며 나답게 살고 싶기 때문이다."\n
  "오늘이 인생의 마지막 날이라면 이미 실패한 일을 후회할 것인가, 아니면 시도하지 않은 일을 후회할 것인가?"\n
  "시도하지 않을 바에야 차라리 실패를 하자."`;

const BookReviewItem = () => {
  const thumbnailImageRef = useRef<HTMLImageElement>(null);
  const [isShowSejulBookReview, setIsShowSejulBookReview] = useState(false);

  const handleMouseEnterThumbnail = () => {
    setIsShowSejulBookReview(true);
    if (thumbnailImageRef.current) {
      thumbnailImageRef.current.style.filter = 'brightness(0.3)';
    }
  };

  const handleMouseLeaveThumbnail = () => {
    setIsShowSejulBookReview(false);
    if (thumbnailImageRef.current) {
      thumbnailImageRef.current.style.filter = 'none';
    }
  };

  return (
    <s.Wrapper>
      <s.ThumnailWrapper
        onMouseEnter={handleMouseEnterThumbnail}
        onMouseLeave={handleMouseLeaveThumbnail}
      >
        <Image
          ref={thumbnailImageRef}
          src={testThumbnailSrc}
          // src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbfiCtu%2FbtrGS4A2l6Y%2FtY8QoI1vSxYGl2tQrQkaH1%2Fimg.png"
          alt="책 섬네일 이미지"
          width={lightTheme.BOOK_TUMBNAIL_WIDTH.DEFAULT}
          height={lightTheme.BOOK_TUMBNAIL_WIDTH.DEFAULT + 70}
          css={s.thumbnailStyle}
        />
        {isShowSejulBookReview && (
          <s.SejulBookReview>{sejul}</s.SejulBookReview>
        )}
        <s.TuhumbnailBottomWrapper>
          <div>
            <FaHeart color={lightTheme.COLOR.RUBY} size={10} />
            <s.LikeCount>25</s.LikeCount>
          </div>
          <div>
            <FaComment size={10} />
            <s.CommentCount>10</s.CommentCount>
          </div>
        </s.TuhumbnailBottomWrapper>
      </s.ThumnailWrapper>
      {/* <s.Title>브레이킹 루틴</s.Title>
      <s.Author>천인우 지음</s.Author>
      <s.Rating>
        {Array.from(Array(5), (_, key) => (
          <AiFillStar key={key} color={lightTheme.COLOR.PRIMARY} size={15} />
        ))}
      </s.Rating>
      <s.Date>2023.01.10</s.Date> */}
    </s.Wrapper>
  );
};

export default BookReviewItem;

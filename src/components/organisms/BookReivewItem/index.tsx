import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaComment } from '@react-icons/all-files/fa/FaComment';
import { FaHeart } from '@react-icons/all-files/fa/FaHeart';
import Route from '@/constants/routes';
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
      <Link href={`${Route.BOOKREVIEW}/1`}>
        <s.ThumnailWrapper
          onMouseEnter={handleMouseEnterThumbnail}
          onMouseLeave={handleMouseLeaveThumbnail}
        >
          <Image
            ref={thumbnailImageRef}
            src={testThumbnailSrc}
            alt="책 섬네일 이미지"
            width={lightTheme.TUMBNAIL.DEFAULT.W}
            height={lightTheme.TUMBNAIL.DEFAULT.H}
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
      </Link>
      <s.Title>&apos;없던 오늘&apos;</s.Title>
    </s.Wrapper>
  );
};

export default BookReviewItem;

import { useRef, useState } from 'react';
import Link from 'next/link';
import { FaComment } from '@react-icons/all-files/fa/FaComment';
import { FaHeart } from '@react-icons/all-files/fa/FaHeart';
import Route from '@/constants/routes';
import { BookReviewSummary } from '@/types/features/bookReview';
import Thumbnail from '@/components/atoms/Thumbnail';
import { lightTheme } from '@/styles/theme';
import * as s from './style';

const BookReviewItem = ({
  id,
  bookname,
  sejul,
  thumbnail,
  likeCount,
  commentCount,
}: BookReviewSummary) => {
  const thumbnailImageRef = useRef<HTMLImageElement>(null);
  const [isShowSejul, setIsShowSejul] = useState(false);

  const handleMouseEnterThumbnail = () => {
    setIsShowSejul(true);
    if (thumbnailImageRef.current) {
      thumbnailImageRef.current.style.filter = 'brightness(0.3)';
    }
  };

  const handleMouseLeaveThumbnail = () => {
    setIsShowSejul(false);
    if (thumbnailImageRef.current) {
      thumbnailImageRef.current.style.filter = 'none';
    }
  };

  return (
    <s.Wrapper>
      <Link href={`${Route.BOOKREVIEW}/${id}`}>
        <s.ThumnailWrapper
          onMouseEnter={handleMouseEnterThumbnail}
          onMouseLeave={handleMouseLeaveThumbnail}
        >
          <Thumbnail
            ref={thumbnailImageRef}
            src={thumbnail}
            alt="책 섬네일 이미지"
            width={lightTheme.TUMBNAIL.DEFAULT.W}
            height={lightTheme.TUMBNAIL.DEFAULT.H}
            css={s.thumbnailStyle}
          />
          {isShowSejul && <s.SejulBookReview>{sejul}</s.SejulBookReview>}
          <s.TuhumbnailBottomWrapper>
            <div>
              <FaHeart color={lightTheme.COLOR.RUBY} size={10} />
              <s.LikeCount>{likeCount}</s.LikeCount>
            </div>
            <div>
              <FaComment size={10} />
              <s.CommentCount>{commentCount}</s.CommentCount>
            </div>
          </s.TuhumbnailBottomWrapper>
        </s.ThumnailWrapper>
      </Link>
      <s.Title>&apos;{bookname}&apos;</s.Title>
    </s.Wrapper>
  );
};

export default BookReviewItem;

import Link from 'next/link';
import { FaComment } from '@react-icons/all-files/fa/FaComment';
import { FaHeart } from '@react-icons/all-files/fa/FaHeart';
import Route from '@/constants/routes';
import { BookReviewSummary } from '@/types/features/bookReview';
import SejulThumbnail from '@/components/organisms/SejulThumbnail';
import { lightTheme } from '@/styles/theme';
import * as s from './style';

const BookReviewItem = ({
  id,
  bookname,
  sejul,
  thumbnail,
  likeCount,
  commentCount,
}: BookReviewSummary) => (
  <s.Wrapper>
    <Link href={`${Route.BOOKREVIEW}/${id}`}>
      <SejulThumbnail
        sejul={sejul}
        src={thumbnail}
        alt="책 섬네일 이미지"
        width={lightTheme.TUMBNAIL.DEFAULT.W}
        height={lightTheme.TUMBNAIL.DEFAULT.H}
        css={s.thumbnailStyle}
      >
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
      </SejulThumbnail>
    </Link>
    <s.Title>&apos;{bookname}&apos;</s.Title>
  </s.Wrapper>
);

export default BookReviewItem;

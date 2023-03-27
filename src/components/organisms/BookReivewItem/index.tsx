import Link from 'next/link';
import { FaComment } from '@react-icons/all-files/fa/FaComment';
import { FaHeart } from '@react-icons/all-files/fa/FaHeart';
import SejulThumbnail from '@/components/organisms/SejulThumbnail';
import Route from '@/constants/routes';
import { lightTheme as theme } from '@/styles/theme';
import {
  LibraryBookReviewSummary,
  FeedBookReviewSummary,
} from '@/types/features/bookReview';
import * as s from './style';

interface BookReviewItemProps {
  bookReview: LibraryBookReviewSummary | FeedBookReviewSummary;
}

const BookReviewItem = ({ bookReview }: BookReviewItemProps) => {
  const isLibraryBookReviewItem = 'bookname' in bookReview;

  return (
    <s.Wrapper>
      <SejulThumbnail
        bookReviewId={bookReview.id}
        sejul={bookReview.sejul}
        src={bookReview.thumbnail}
        alt="책 섬네일 이미지"
        width={theme.TUMBNAIL.DEFAULT.W}
        height={theme.TUMBNAIL.DEFAULT.H}
        css={s.thumbnailStyle}
      >
        <s.TuhumbnailBottomWrapper>
          <div>
            <FaHeart color={theme.COLOR.RUBY} size={10} />
            <s.LikeCount>{bookReview.likeCount}</s.LikeCount>
          </div>
          <div>
            <FaComment size={10} />
            <s.CommentCount>{bookReview.commentCount}</s.CommentCount>
          </div>
        </s.TuhumbnailBottomWrapper>
      </SejulThumbnail>

      <s.Title>
        {isLibraryBookReviewItem ? (
          <>&apos;{bookReview.bookname}&apos;</>
        ) : (
          <Link href={`/${bookReview.userId}${Route.LIBRARY}`}>
            <span>{bookReview.writer}</span>의 서재
          </Link>
        )}
      </s.Title>
    </s.Wrapper>
  );
};

export default BookReviewItem;

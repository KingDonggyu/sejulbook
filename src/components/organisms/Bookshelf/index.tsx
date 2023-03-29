import { Fragment } from 'react';
import Link from 'next/link';
import { css, Theme } from '@emotion/react';
import { GiPencil } from '@react-icons/all-files/gi/GiPencil';
import { AiOutlinePlus } from '@react-icons/all-files/ai/AiOutlinePlus';
import Route from '@/constants/routes';
import convert1DArrayTo2DArray from '@/utils/convert1DArrayTo2DArray';
import useIntersect from '@/hooks/useIntersect';
import { iconButtonStyle } from '@/styles/common';
import {
  LibraryBookReviewSummary,
  FeedBookReviewSummary,
} from '@/types/features/bookReview';
import BookReviewItem from '../BookReivewItem';
import * as s from './style';

type BookReview = LibraryBookReviewSummary | FeedBookReviewSummary;

interface BookshelfProps {
  bookReviewList: BookReview[];
  hasWriteBookReviewItem: boolean;
  onRefetch?: () => void;
}

const WriteBookReviewItem = () => (
  <Link
    href={Route.NEWBOOK_SEARCH}
    css={(theme: Theme) => css`
      ${s.wrtieBookReviewButtonStyle(theme)}
      ${iconButtonStyle}
    `}
  >
    독후감 쓰기
    <GiPencil size={40} />
    <AiOutlinePlus size={20} />
  </Link>
);

const BookshelfRow = ({ row }: { row: (BookReview | null)[] }) => (
  <s.Row>
    {row.map((bookReview) => {
      if (!bookReview) {
        return <WriteBookReviewItem key={0} />;
      }

      return <BookReviewItem key={bookReview.id} bookReview={bookReview} />;
    })}
  </s.Row>
);

const Bookshelf = ({
  bookReviewList,
  hasWriteBookReviewItem,
  onRefetch,
}: BookshelfProps) => {
  const initializedBookShelf = hasWriteBookReviewItem ? [null] : [];

  const intersectRef = useIntersect(() => {
    if (onRefetch) {
      onRefetch();
    }
  });

  const bookshelf = convert1DArrayTo2DArray(
    [...initializedBookShelf, ...bookReviewList],
    3,
  );

  return (
    <s.Wrapper>
      {bookshelf.map((row) => (
        <Fragment key={row[0] ? row[0].id : 0}>
          <BookshelfRow row={row} />
          <s.Divider />
        </Fragment>
      ))}
      {bookshelf.length ? (
        <s.IntersectTarget ref={intersectRef} />
      ) : (
        <s.AltText>독후감이 없습니다</s.AltText>
      )}
    </s.Wrapper>
  );
};

export default Bookshelf;

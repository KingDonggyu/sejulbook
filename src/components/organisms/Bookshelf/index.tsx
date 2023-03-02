import { Fragment } from 'react';
import Link from 'next/link';
import { GiPencil } from '@react-icons/all-files/gi/GiPencil';
import { AiOutlinePlus } from '@react-icons/all-files/ai/AiOutlinePlus';
import Route from '@/constants/routes';
import { BookReivewList, BookReviewSummary } from '@/types/features/bookReview';
import convert1DArrayTo2DArray from '@/utils/convert1DArrayTo2DArray';
import BookReviewItem from '../BookReivewItem';
import * as s from './style';

interface BookshelfProps {
  bookReviewList: BookReivewList;
}

const WriteBookReviewItem = () => (
  <Link href={Route.NEWBOOK_SEARCH} css={s.wrtieBookReviewButtonStyle}>
    <GiPencil size={40} />
    <AiOutlinePlus size={20} />
  </Link>
);

const BookshelfRow = ({ row }: { row: (BookReviewSummary | null)[] }) => (
  <s.Row>
    {row.map((bookReview) => {
      if (!bookReview) {
        return <WriteBookReviewItem key={0} />;
      }

      return <BookReviewItem key={bookReview.id} {...bookReview} />;
    })}
  </s.Row>
);

const Bookshelf = ({ bookReviewList }: BookshelfProps) => {
  const bookshelf = convert1DArrayTo2DArray([null, ...bookReviewList], 3);

  return (
    <s.Wrapper>
      {bookshelf.map((row) => (
        <Fragment key={row[0] ? row[0].id : 0}>
          <BookshelfRow row={row} />
          <s.Divider />
        </Fragment>
      ))}
    </s.Wrapper>
  );
};

export default Bookshelf;

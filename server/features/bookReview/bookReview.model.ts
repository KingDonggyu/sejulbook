import query from 'server/database/query';
import BookReviewEntity from './bookReviewEntity';

const TABLE_NAME = 'sejulbook';

enum Column {
  ID = 'id',
  BOOK_NAME = 'bookname',
  WRITER = 'writer',
  PUBLICATION = 'publication',
  PUBLISHER = 'publisher',
  GRADE = 'grade',
  SEJUL = 'sejul',
  SEJUL_PLUS = 'sejulplus',
  USER_ID = 'user_id',
  CATEGORY_ID = 'category_id',
  DEVIDE = 'devide',
}

const bookReviewModel = {
  createBookReview: async (
    bookReview: Omit<BookReviewEntity, 'id' | 'devide'>,
  ) => {
    const sql = `insert into ${TABLE_NAME} values (
      "${bookReview.bookname}",
      "${bookReview.writer}",
      "${bookReview.publication}",
      "${bookReview.publisher}",
      ${bookReview.grade},
      "${bookReview.sejul}",
      "${bookReview.sejulplus}",
      default,
      ${bookReview.user_id},
      ${bookReview.category_id},
      ${1}
    )`;

    await query(sql);
  },
};

export default bookReviewModel;
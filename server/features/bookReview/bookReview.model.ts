import { ResultSetHeader } from 'mysql2';
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
  THUMBNAIL = 'thumbnail',
  SEJUL = 'sejul',
  SEJUL_PLUS = 'sejulplus',
  USER_ID = 'user_id',
  CATEGORY_ID = 'category_id',
  DEVIDE = 'devide',
}

type BookReviewSummary = Pick<
  BookReviewEntity,
  'id' | 'bookname' | 'sejul' | 'thumbnail'
>;

const bookReviewModel = {
  getBookReviewList: async ({ user_id }: Pick<BookReviewEntity, 'user_id'>) => {
    const sql = `
      select ${Column.ID}, ${Column.BOOK_NAME}, ${Column.SEJUL}, ${Column.THUMBNAIL}
      from ${TABLE_NAME} 
      where ${Column.USER_ID} = ${user_id}
    `;

    const result = await query<BookReviewSummary[]>(sql);
    return result;
  },

  createBookReview: async (
    bookReview: Omit<BookReviewEntity, 'id' | 'devide'>,
  ) => {
    const sql = `insert into ${TABLE_NAME} values (
      null,
      "${bookReview.bookname}",
      "${bookReview.writer}",
      "${bookReview.publication}",
      "${bookReview.publisher}",
      ${bookReview.grade},
      "${bookReview.thumbnail}",
      "${bookReview.sejul}",
      "${bookReview.sejulplus}",
      default,
      ${bookReview.user_id},
      ${bookReview.category_id},
      ${1}
    )`;

    const { insertId } = await query<ResultSetHeader>(sql);
    return insertId;
  },
};

export default bookReviewModel;

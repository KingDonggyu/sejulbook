import { ResultSetHeader } from 'mysql2';
import query from 'server/database/query';
import BookReviewEntity, { DateCreated } from './bookReview.entity';

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
  DiVIDE = 'divide',
  ORIGIN_THUMBNAIL = 'origin_thumbnail',
  DATE_CREATED = 'datecreated',
}

type BookReviewSummary = Pick<
  BookReviewEntity,
  'id' | 'bookname' | 'sejul' | 'thumbnail'
>;

type DraftSavedBookReview = Pick<
  BookReviewEntity,
  'id' | 'bookname' | 'datecreated'
>;

const bookReviewModel = {
  getBookReviewList: async ({ user_id }: Pick<BookReviewEntity, 'user_id'>) => {
    const sql = `
      select ${Column.ID}, ${Column.BOOK_NAME}, ${Column.SEJUL}, ${Column.THUMBNAIL}
      from ${TABLE_NAME} 
      where ${Column.USER_ID} = ${user_id} and ${Column.DiVIDE} = 1
    `;

    const result = await query<BookReviewSummary[]>(sql);
    return result;
  },

  getDraftSavedList: async ({ user_id }: Pick<BookReviewEntity, 'user_id'>) => {
    const sql = `
      select ${Column.ID}, ${Column.BOOK_NAME}, ${Column.DATE_CREATED}
      from ${TABLE_NAME} 
      where ${Column.USER_ID} = ${user_id} and ${Column.DiVIDE} = 0
    `;

    const result = await query<DraftSavedBookReview[]>(sql);
    return result;
  },

  getBookReivew: async ({ id }: Pick<BookReviewEntity, 'id'>) => {
    const sql = `select * from ${TABLE_NAME} where ${Column.ID} = ${id}`;

    const [result] = await query<BookReviewEntity[]>(sql);
    return result;
  },

  createBookReview: async (
    bookReview: Omit<BookReviewEntity, 'id' | 'datecreated'>,
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
      ${bookReview.divide},
      ${bookReview.origin_thumbnail ? `"${bookReview.origin_thumbnail}"` : null}
    )`;

    const { insertId } = await query<ResultSetHeader>(sql);
    return insertId;
  },

  updateBookReview: async (
    bookReview: Omit<BookReviewEntity, 'datecreated'> & {
      datecreated?: DateCreated;
    },
  ) => {
    const dateCreated = bookReview.datecreated
      ? `"${bookReview.datecreated}"`
      : 'default';

    const sql = `
      update ${TABLE_NAME} set 
      ${Column.GRADE} = ${bookReview.grade},
      ${Column.THUMBNAIL} = "${bookReview.thumbnail}",
      ${Column.SEJUL} = "${bookReview.sejul}",
      ${Column.SEJUL_PLUS} = "${bookReview.sejulplus}",
      ${Column.DATE_CREATED} = ${dateCreated},
      ${Column.CATEGORY_ID} = ${bookReview.category_id},
      ${Column.DiVIDE} = ${bookReview.divide}
      where ${Column.ID} = ${bookReview.id}
    `;

    await query<ResultSetHeader>(sql);
  },
};

export default bookReviewModel;

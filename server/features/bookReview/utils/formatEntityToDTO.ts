import BookReviewDTO from '../bookReview.dto';
import BookReviewEntity from '../bookReview.entity';

const formatEntityToDTO = (
  bookReviewEntity: BookReviewEntity,
): BookReviewDTO => {
  const bookReviewDTO: BookReviewDTO = {
    id: bookReviewEntity.id,
    bookname: bookReviewEntity.bookname,
    authors: bookReviewEntity.writer,
    publication: bookReviewEntity.publication,
    publisher: bookReviewEntity.publisher,
    thumbnail: bookReviewEntity.thumbnail,
    rating: bookReviewEntity.grade,
    sejul: bookReviewEntity.sejul,
    content: bookReviewEntity.sejulplus,
    userId: bookReviewEntity.user_id,
    categoryId: bookReviewEntity.category_id,
    isDraftSave: Boolean(!bookReviewEntity.divide),
    originThumbnail: bookReviewEntity.origin_thumbnail || undefined,
    createdAt: bookReviewEntity.datecreated,
  };

  return bookReviewDTO;
};

export default formatEntityToDTO;

import BookReviewDTO from '../bookReview.dto';
import OriginBookReviewEntity from '../bookReview.entity';

type BookReviewEntity = Omit<OriginBookReviewEntity, 'id' | 'datecreated'>;

const formatDTOToEntity = (bookReviewDTO: BookReviewDTO): BookReviewEntity => {
  const bookReviewEntity: BookReviewEntity = {
    ...bookReviewDTO,
    writer: bookReviewDTO.authors,
    grade: bookReviewDTO.rating,
    sejul: bookReviewDTO.sejul.replace(/"/g, '""'),
    sejulplus: bookReviewDTO.content.replace(/"/g, '""'),
    user_id: bookReviewDTO.userId,
    category_id: bookReviewDTO.categoryId,
    divide: bookReviewDTO.isDraftSave ? 0 : 1,
    origin_thumbnail: bookReviewDTO.originThumbnail || null,
  };

  return bookReviewEntity;
};

export default formatDTOToEntity;

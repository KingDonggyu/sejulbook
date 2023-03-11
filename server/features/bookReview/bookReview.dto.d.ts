import { UserId } from '../user/user.dto';
import { CategoryId } from '../category/category.dto';

export type BookReviewId = number;

interface BookReviewDTO {
  id: BookReviewId;
  bookname: string;
  authors: string;
  publication: string;
  publisher: string;
  thumbnail: string;
  rating: number;
  sejul: string;
  content: string;
  userId: UserId;
  categoryId: CategoryId;
  isDraftSave: boolean;
  originThumbnail?: string;
  createdAt: string;
}

export default BookReviewDTO;

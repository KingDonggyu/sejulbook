import { UserId } from '../user/user.dto';
import { CategoryId } from '../category/category.dto';

export type BookReviewId = number;
type Rating = 1 | 2 | 3 | 4 | 5;

interface BookReviewDTO {
  id: BookReviewId;
  bookname: string;
  authors: string;
  publication: string;
  publisher: string;
  thumbnail: string;
  rating: Rating;
  sejul: string;
  content: string;
  userId: UserId;
  categoryId: CategoryId;
  isDraftSave: boolean;
  createAt: string;
}

export default BookReviewDTO;

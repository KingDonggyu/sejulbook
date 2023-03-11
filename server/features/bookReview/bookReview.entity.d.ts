import { UserId } from '../user/user.entity';
import { CategoryId } from '../category/category.entity';

export type BookReviewId = number;
export type DateCreated = string;

type Devide = 0 | 1; // 0 = 임시 저장, 1 = 발행

interface BookReviewEntity {
  id: BookReviewId;
  bookname: string;
  writer: string;
  publication: string;
  publisher: string;
  grade: number;
  thumbnail: string;
  sejul: string;
  sejulplus: string;
  user_id: UserId;
  category_id: CategoryId;
  divide: Devide;
  datecreated: DateCreated;
  origin_thumbnail: string | null;
}

export default BookReviewEntity;

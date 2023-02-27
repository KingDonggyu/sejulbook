import { UserId } from '../user/user.entity';
import { CategoryId } from '../category/category.entity';

type Grade = 1 | 2 | 3 | 4 | 5;
type Devide = 0 | 1; // 0 = 임시 저장, 1 = 발행

interface BookReviewEntity {
  id: number;
  bookname: string;
  writer: string;
  publication: string;
  publisher: string;
  grade: Grade;
  sejul: string;
  sejulplus: string;
  user_id: UserId;
  category_id: CategoryId;
  divide: Devide;
}

export default BookReviewEntity;

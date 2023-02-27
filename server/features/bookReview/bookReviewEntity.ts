import { UserId } from '../user/user.entity';

type Grade = 1 | 2 | 3 | 4 | 5;
type Devide = 0 | 1;

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
  category_id: number;
  divide: Devide;
}

export default BookReviewEntity;

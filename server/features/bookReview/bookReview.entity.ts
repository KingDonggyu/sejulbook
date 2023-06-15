import { sejulbook } from '@prisma/client';

export type HomeBookReviewEntity = Pick<
  sejulbook,
  'id' | 'bookname' | 'sejul' | 'thumbnail' | 'datecreated' | 'user_id'
>;

export type PagedBookReivewEntity = Pick<
  sejulbook,
  'id' | 'sejul' | 'thumbnail' | 'user_id'
>;

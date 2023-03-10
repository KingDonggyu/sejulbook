import type { NextApiRequest, NextApiResponse } from 'next';
import bookReviewService from 'server/features/bookReview/bookReview.service';
import checkAuth from '@/services/middlewares/checkAuth';
import { UserId } from '@/types/features/user';
import { BookReviewId } from '@/types/features/bookReview';

interface ExtenedNextApiRequest extends Omit<NextApiRequest, 'query'> {
  query: { id: BookReviewId; userId: UserId };
}

const handler = async (req: ExtenedNextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  let result;

  if (req.method === 'DELETE') {
    if (!(await checkAuth(req, res))) {
      return;
    }
    result = await bookReviewService.deletedBookReview({ id });
  } else {
    result = await bookReviewService.getBookReivew({ id });
  }

  if (!result.error) {
    res.status(200).json(result);
    return;
  }

  res.status(result.code).json(result);
};

export default handler;

import type { NextApiRequest, NextApiResponse } from 'next';
import { BookReviewListRequest } from '@/types/features/bookReview';
import bookReviewService from 'server/features/bookReview/bookReview.service';

interface ExtendedNextApiRequest extends Omit<NextApiRequest, 'query'> {
  query: BookReviewListRequest;
}

const handler = async (req: ExtendedNextApiRequest, res: NextApiResponse) => {
  const { query, pageParam = null } = req.query;

  const result = await bookReviewService.getPagingBookReviewListByTag({
    tag: query,
    maxId: pageParam,
  });

  if (!result.error) {
    res.status(200).json(result);
    return;
  }

  res.status(result.code).json(result);
};

export default handler;

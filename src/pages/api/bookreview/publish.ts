import type { NextApiRequest, NextApiResponse } from 'next';
import bookReviewService from 'server/features/bookReview/bookReview.service';
import checkAuth from '@/services/middlewares/checkAuth';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await checkAuth(req, res);

  const result = await bookReviewService.publishBookReview(req.body);

  if (result.error) {
    res.status(result.code).json(result);
    return;
  }

  res.status(200).json(result);
};

export default handler;

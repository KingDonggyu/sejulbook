import type { NextApiRequest, NextApiResponse } from 'next';
import bookReviewService from 'server/features/bookReview/bookReview.service';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = req.query;
  const bookReviewListresult = await bookReviewService.getDraftSavedList({
    userId: Number(userId),
  });

  if (!bookReviewListresult.error) {
    res.status(200).json(bookReviewListresult);
    return;
  }

  res.status(bookReviewListresult.code).json(bookReviewListresult);
};

export default handler;

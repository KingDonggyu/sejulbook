import type { NextApiRequest, NextApiResponse } from 'next';
import bookReviewService from 'server/features/bookReview/bookReview.service';
import tagService from 'server/features/tag/tag.service';
import checkAuth from '@/services/middlewares/checkAuth';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await checkAuth(req, res);

  const result = await bookReviewService.updateBookReview(req.body);

  if (result.error) {
    res.status(result.code).json(result);
    return;
  }

  const bookReviewId = Number(req.body.id);

  await tagService.deleteTags({ bookReviewId });

  await tagService.writeTags({
    tags: req.body.tags,
    bookReviewId,
  });

  res.status(200).json(result);
};

export default handler;

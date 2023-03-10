import type { NextApiRequest, NextApiResponse } from 'next';
import bookReviewService from 'server/features/bookReview/bookReview.service';
import tagService from 'server/features/tag/tag.service';
import checkAuth from '@/services/middlewares/checkAuth';
import { PublishRequest } from '@/types/features/bookReview';

interface ExtendedNextApiRequest extends NextApiRequest {
  body: PublishRequest;
}

const handler = async (req: ExtendedNextApiRequest, res: NextApiResponse) => {
  await checkAuth(req, res);

  const service = req.body.isDraftSave
    ? bookReviewService.draftSaveBookReview
    : bookReviewService.publishBookReview;

  const result = await service(req.body);

  if (result.error) {
    res.status(result.code).json(result);
    return;
  }

  if (req.body.id) {
    await tagService.deleteTags({ bookReviewId: req.body.id });
  }

  await tagService.writeTags({
    tags: req.body.tags,
    bookReviewId: result.data,
  });

  res.status(200).json(result);
};

export default handler;

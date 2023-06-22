import type { NextApiRequest, NextApiResponse } from 'next';
import BookReviewService from '@/server/services/bookReview.service';
import { MethodNotAllowedException } from '@/server/exceptions';
import authentication from '@/server/middlewares/authentication';
import errorHandler from '@/server/middlewares/errorHandler';
import HttpMethods from '@/constants/httpMethods';

interface GetApiRequest extends Omit<NextApiRequest, 'query'> {
  method: HttpMethods.GET;
  query: { id: string };
}

interface DeleteApiRequest extends Omit<NextApiRequest, 'query'> {
  method: HttpMethods.DELETE;
  query: { id: string; userId: string };
}

interface PublishedPutApiRequest extends Omit<NextApiRequest, 'query'> {
  method: HttpMethods.PUT;
  query: { id: string; userId: string; isPublished: 'true' };
  body: {
    rating: string;
    sejul: string;
    content: string;
    thumbnail: string;
    categoryId: string;
    tags: string[];
  };
}

interface DraftSavedPutApiRequest extends Omit<NextApiRequest, 'query'> {
  method: HttpMethods.PUT;
  query: { id: string; userId: string; isPublished: 'false' };
  body: {
    rating: string;
    sejul: string;
    content: string;
    thumbnail?: string;
    categoryId?: string;
    tags: string[];
  };
}

type ExtenedNextApiRequest =
  | GetApiRequest
  | DeleteApiRequest
  | PublishedPutApiRequest
  | DraftSavedPutApiRequest;

const handler = async (req: ExtenedNextApiRequest, res: NextApiResponse) => {
  const bookReviewService = new BookReviewService();
  const id = +req.query.id;

  if (req.method === HttpMethods.GET) {
    const data = await bookReviewService.find(id);
    res.status(200).json(data);
    return;
  }

  const userId = +req.query.userId;

  await authentication(req, res, userId);

  if (req.method === HttpMethods.DELETE) {
    await bookReviewService.delete(id);
    res.status(200).end();
    return;
  }

  if (req.method !== HttpMethods.PUT) {
    const error = new MethodNotAllowedException();
    res.status(error.code).send(error);
  }

  if (req.query.isPublished === 'true') {
    const { body } = req as PublishedPutApiRequest;
    await bookReviewService.updatePublished(id, {
      ...body,
      rating: +body.rating,
      categoryId: +body.categoryId,
    });
    res.status(200).end();
    return;
  }

  const { body } = req as DraftSavedPutApiRequest;
  await bookReviewService.updateDraftSaved(id, {
    ...body,
    rating: +body.rating,
    categoryId: body.categoryId ? +body.categoryId : undefined,
  });
};

export default errorHandler(handler);

import type { NextApiRequest, NextApiResponse } from 'next';
import CommentService from 'server/services/comment/comment.service';
import auth from '@/lib/auth';
import HttpMethods from '@/constants/httpMethods';
import { MethodNotAllowedException } from 'server/exceptions';

interface NextPostApiRequest extends Omit<NextApiRequest, 'query'> {
  method: HttpMethods.POST;
  query: { bookReviewId: string; commenterId: string };
  body: { content: string };
}

interface NextPutApiRequest extends Omit<NextApiRequest, 'query'> {
  method: HttpMethods.PUT;
  query: { bookReviewId: string; commenterId: string };
  body: { id: string; content: string };
}

interface NextDeleteApiRequest extends Omit<NextApiRequest, 'query'> {
  method: HttpMethods.DELETE;
  query: { bookReviewId: string; id: string; commenterId: string };
}

type ExtendedNextApiRequest =
  | NextPostApiRequest
  | NextPutApiRequest
  | NextDeleteApiRequest;

const handler = async (req: ExtendedNextApiRequest, res: NextApiResponse) => {
  const commentService = new CommentService();
  const bookReviewId = +req.query.bookReviewId;
  const commenterId = +req.query.commenterId;

  await auth(req, res, commenterId);

  switch (req.method) {
    case HttpMethods.POST: {
      const { content } = req.body;
      await commentService.create({ bookReviewId, content, commenterId });
      break;
    }
    case HttpMethods.PUT: {
      const { id, content } = req.body;
      await commentService.update({ id: +id, content });
      break;
    }
    case HttpMethods.DELETE: {
      const { id } = req.query;
      await commentService.delete(+id);
      break;
    }
    default: {
      throw new MethodNotAllowedException();
    }
  }

  res.status(200).end();
};

export default handler;

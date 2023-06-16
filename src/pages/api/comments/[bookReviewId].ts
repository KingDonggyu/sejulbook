import type { NextApiRequest, NextApiResponse } from 'next';
import CommentService from 'server/services/comment/comment.service';
import checkAuth from '@/services/middlewares/checkAuth';
import HttpMethods from '@/constants/httpMethods';
import { UpdateCommentRequest } from '@/types/comment/update';
import { CreateCommentRequest } from '@/types/comment/create';

interface CommentAPiRequestextends extends Omit<NextApiRequest, 'query'> {
  query: { bookReviewId: string };
}

interface NextGetApiRequest extends CommentAPiRequestextends {
  method: HttpMethods.GET;
}

interface NextDeleteApiRequest extends CommentAPiRequestextends {
  method: HttpMethods.DELETE;
  query: {
    id: string;
    commenterId: string;
    bookReviewId: string;
  };
}

interface NextPutApiRequest extends CommentAPiRequestextends {
  method: HttpMethods.PUT;
  body: UpdateCommentRequest;
}

interface NextPostApiRequest extends CommentAPiRequestextends {
  method: HttpMethods.POST;
  body: CreateCommentRequest;
}

type ExtendedNextApiRequest =
  | NextGetApiRequest
  | NextPostApiRequest
  | NextDeleteApiRequest
  | NextPutApiRequest;

const handler = async (req: ExtendedNextApiRequest, res: NextApiResponse) => {
  const commentService = new CommentService();
  const bookReviewId = Number(req.query.bookReviewId);

  switch (req.method) {
    case HttpMethods.POST: {
      const { commenterId, content } = req.body;
      await checkAuth(req, res, commenterId);
      await commentService.create({ bookReviewId, commenterId, content });
      break;
    }
    case HttpMethods.PUT: {
      const { id, content, commenterId } = req.body;
      await checkAuth(req, res, commenterId);
      await commentService.update({ id, content });
      break;
    }
    case HttpMethods.DELETE:
      await checkAuth(req, res, +req.query.commenterId);
      await commentService.delete(+req.query.id);
      break;
    default: {
      const comments = await commentService.findAllByBookReview(bookReviewId);
      res.status(200).json(comments);
    }
  }

  res.status(200).end();
};

export default handler;

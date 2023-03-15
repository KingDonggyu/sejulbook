import type { NextApiRequest, NextApiResponse } from 'next';
import commentService from 'server/features/comment/comment.service';
import {
  CommentDeleteRequest,
  CommentRequest,
  CommentUpdateRequest,
} from '@/types/features/comment';
import checkAuth from '@/services/middlewares/checkAuth';

interface NextGetApiRequest extends Omit<NextApiRequest, 'query'> {
  method: 'GET';
  query: Pick<CommentRequest, 'bookReviewId'>;
}

interface NextDeleteApiRequest extends Omit<NextApiRequest, 'query'> {
  method: 'DELETE';
  query: CommentDeleteRequest;
}

interface NextUpdateApiRequest extends Omit<NextApiRequest, 'query'> {
  method: 'PUT';
  query: Pick<CommentRequest, 'bookReviewId'>;
  body: Omit<CommentUpdateRequest, 'bookReviewId'>;
}

interface NextPostApiRequest extends Omit<NextApiRequest, 'query'> {
  method: 'POST';
  query: Pick<CommentRequest, 'bookReviewId'>;
  body: Omit<CommentRequest, 'bookReviewId'>;
}

type ExtendedNextApiRequest =
  | NextGetApiRequest
  | NextPostApiRequest
  | NextDeleteApiRequest
  | NextUpdateApiRequest;

const handler = async (req: ExtendedNextApiRequest, res: NextApiResponse) => {
  let result;
  const { bookReviewId } = req.query;

  switch (req.method) {
    case 'POST':
      if (!(await checkAuth(req, res, req.body.commenterId))) {
        return;
      }
      result = await commentService.AddComment({
        bookReviewId,
        commenterId: req.body.commenterId,
        content: req.body.content,
      });
      break;

    case 'DELETE':
      if (!(await checkAuth(req, res, req.query.userId))) {
        return;
      }
      result = await commentService.deleteComment({ id: req.query.id });
      break;

    case 'PUT':
      if (!(await checkAuth(req, res, req.body.userId))) {
        return;
      }
      result = await commentService.updateComment({
        id: req.body.id,
        content: req.body.content,
      });
      break;

    default:
      result = await commentService.getComments({ bookReviewId });
  }

  if (!result.error) {
    res.status(200).json(result);
    return;
  }

  res.status(result.code).json(result);
};

export default handler;

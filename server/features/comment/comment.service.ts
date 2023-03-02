import { bookReviewError } from 'server/constants/message';
import { HttpResponse } from 'server/types/http';
import CommentDTO from './comment.dto';
import commentModel from './comment.model';

const commentService = {
  getComments: async ({
    bookReviewId,
  }: Pick<CommentDTO, 'bookReviewId'>): Promise<HttpResponse<CommentDTO[]>> => {
    try {
      const data = await commentModel.getComments({
        sejulbook_id: bookReviewId,
      });

      return {
        error: false,
        data: data.map(({ sejulbook_id, replyer_id, reply, replydate }) => ({
          bookReviewId: sejulbook_id,
          commenterId: replyer_id,
          content: reply,
          createdAt: replydate,
        })),
      };
    } catch {
      return {
        error: true,
        code: 404,
        message: bookReviewError.NOT_EXIST_BOOKREVIEW,
      };
    }
  },
};

export default commentService;

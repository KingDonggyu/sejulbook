import { HttpSuccess, HttpFailed } from 'server/types/http';
import LikeDTO from './like.dto';
import likeModel from './like.model';

const likeService = {
  like: async ({
    bookReviewId,
    likerId,
  }: LikeDTO): Promise<HttpSuccess<undefined> | HttpFailed> => {
    await likeModel.createLike({
      sejulbook_id: bookReviewId,
      liker_id: likerId,
    });

    return { error: false, data: undefined };
  },

  unlike: async ({
    likerId,
  }: Pick<LikeDTO, 'likerId'>): Promise<
    HttpSuccess<undefined> | HttpFailed
  > => {
    await likeModel.deleteLike({ liker_id: likerId });

    return { error: false, data: undefined };
  },

  checkIsLike: async ({
    bookReviewId,
    likerId,
  }: LikeDTO): Promise<HttpSuccess<boolean> | HttpFailed> => {
    const result = await likeModel.getLike({
      sejulbook_id: bookReviewId,
      liker_id: likerId,
    });

    const isLike = !!result.length;

    return { error: false, data: isLike };
  },
};

export default likeService;

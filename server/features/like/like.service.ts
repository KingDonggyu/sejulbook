import { userError } from 'server/constants/message';
import { HttpSuccess, HttpFailed } from 'server/types/http';
import { UserId } from '../user/user.dto';
import LikeDTO from './like.dto';
import likeModel from './like.model';

interface LikeStatus {
  likeCount: number;
  isLike: boolean;
}

const likeService = {
  getLikeStatus: async ({
    bookReviewId,
    likerId,
  }: Omit<LikeDTO, 'likerId'> & { likerId?: UserId }): Promise<
    HttpSuccess<LikeStatus> | HttpFailed
  > => {
    const result = await Promise.allSettled([
      likerId
        ? likeModel.getLike({
            sejulbook_id: bookReviewId,
            liker_id: likerId,
          })
        : [],
      likeModel.getLikeCount({
        sejulbook_id: bookReviewId,
      }),
    ]);

    const myLike = result[0].status === 'fulfilled' ? result[0].value : [];
    const likeCount = result[1].status === 'fulfilled' ? result[1].value : 0;
    const isLike = !!myLike.length;

    return { error: false, data: { isLike, likeCount } };
  },

  like: async ({
    bookReviewId,
    likerId,
  }: LikeDTO): Promise<HttpSuccess<undefined> | HttpFailed> => {
    if (!likerId) {
      return { error: true, code: 401, message: userError.NOT_LOGGED };
    }

    await likeModel.createLike({
      sejulbook_id: bookReviewId,
      liker_id: likerId,
    });

    return { error: false, data: undefined };
  },

  unlike: async ({
    bookReviewId,
    likerId,
  }: LikeDTO): Promise<HttpSuccess<undefined> | HttpFailed> => {
    if (!likerId) {
      return { error: true, code: 401, message: userError.NOT_LOGGED };
    }

    await likeModel.deleteLike({
      sejulbook_id: bookReviewId,
      liker_id: likerId,
    });

    return { error: false, data: undefined };
  },
};

export default likeService;

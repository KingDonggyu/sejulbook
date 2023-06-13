import { reply } from '@prisma/client';
import CommentDto from './comment.dto';

const commentUtils = {
  entityToDto(entity: reply): CommentDto {
    return {
      id: entity.id,
      bookReviewId: entity.sejulbook_id,
      commenterId: entity.replyer_id,
      content: entity.reply,
      createdAt: entity.replydate,
    };
  },
};

export default commentUtils;

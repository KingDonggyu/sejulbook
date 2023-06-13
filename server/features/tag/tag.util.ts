import { tag } from '@prisma/client';
import TagDto from './tag.dto';

const tagUtils = {
  entityToDto(entity: tag): TagDto {
    return {
      id: entity.id,
      bookReviewId: entity.sejulbook_id,
      tag: entity.tag,
    };
  },
};

export default tagUtils;

import { HttpResponse } from 'server/types/http';
import TagDTO, { Tag } from './tag.dto';
import tagModel from './tag.model';

const tagService = {
  getTags: async ({
    bookReviewId,
  }: Pick<TagDTO, 'bookReviewId'>): HttpResponse<Pick<TagDTO, 'tag'>[]> => {
    const data = await tagModel.getTags({ sejulbook_id: bookReviewId });

    return { error: false, data };
  },

  writeTags: async ({
    tags,
    bookReviewId,
  }: { tags: Tag[] } & Pick<
    TagDTO,
    'bookReviewId'
  >): HttpResponse<undefined> => {
    const promises = tags.map(async (tag) => {
      await tagModel.createTags({ tag, sejulbook_id: bookReviewId });
    });

    Promise.all(promises);

    return { error: false, data: undefined };
  },
};

export default tagService;

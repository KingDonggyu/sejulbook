import { HttpResponse } from 'server/types/http';
import TagDTO, { Tag } from './tag.dto';
import tagModel from './tag.model';

type TagList = Pick<TagDTO, 'tag'>[];

const tagService = {
  getTags: async ({
    bookReviewId,
  }: Pick<TagDTO, 'bookReviewId'>): Promise<HttpResponse<TagList>> => {
    const data = await tagModel.getTags({ sejulbook_id: bookReviewId });

    return { error: false, data };
  },

  writeTags: async ({
    tags,
    bookReviewId,
  }: { tags: Tag[] } & Pick<TagDTO, 'bookReviewId'>): Promise<
    HttpResponse<undefined>
  > => {
    const promises = tags.map(async (tag) => {
      await tagModel.createTags({ tag, sejulbook_id: bookReviewId });
    });

    Promise.all(promises);

    return { error: false, data: undefined };
  },
};

export default tagService;

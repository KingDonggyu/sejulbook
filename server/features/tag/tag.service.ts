import { HttpSuccess, HttpFailed } from 'server/types/http';
import TagDTO, { Tag } from './tag.dto';
import tagModel from './tag.model';

const tagService = {
  writeTags: async ({
    tags,
    bookReviewId,
  }: { tags: Tag[] } & Pick<TagDTO, 'bookReviewId'>): Promise<
    HttpSuccess<undefined> | HttpFailed
  > => {
    const promises = tags.map(async (tag) => {
      await tagModel.createTags({ tag, sejulbook_id: bookReviewId });
    });

    Promise.all(promises);

    return { error: false, data: undefined };
  },
};

export default tagService;

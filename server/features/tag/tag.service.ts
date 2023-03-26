import { HttpResponse } from 'server/types/http';
import TagDTO, { Tag } from './tag.dto';
import tagModel from './tag.model';

type TagList = Pick<TagDTO, 'tag'>[];

interface SearchedTag extends Pick<TagDTO, 'tag'> {
  count: number;
}

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

  deleteTags: async ({
    bookReviewId,
  }: Pick<TagDTO, 'bookReviewId'>): Promise<HttpResponse<undefined>> => {
    await tagModel.deleteTags({ sejulbook_id: bookReviewId });
    return { error: false, data: undefined };
  },

  searchTags: async ({
    tag,
  }: Pick<TagDTO, 'tag'>): Promise<HttpResponse<SearchedTag[]>> => {
    const tags = await tagModel.getSearchedTags({ tag });
    return { error: false, data: tags };
  },
};

export default tagService;

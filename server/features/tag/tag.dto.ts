export type Tag = string;
export type BookReviewId = number;

interface TagDto {
  id: number;
  tag: Tag;
  bookReviewId: BookReviewId;
}

export type CreateTagDto = Omit<TagDto, 'id'>;

export default TagDto;

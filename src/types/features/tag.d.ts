export type Tag = string;

export type TagList = Set<Tag>;

export type TagResponse = { tag: Tag }[];

export interface SearchedTag {
  tag: Tag;
  count: number;
}

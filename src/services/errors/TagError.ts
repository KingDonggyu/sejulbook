import ErrorBase from '@/lib/ErrorBase';

export type TagErrorName = 'GET_TAGS_ERROR' | 'SERACH_TAG_ERROR';

export class TagError extends ErrorBase<TagErrorName> {}

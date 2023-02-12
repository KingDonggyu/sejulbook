export const APP_NAME = '세 줄 독후감';

export enum OAuthName {
  GOOGLE = 'google',
  NAVER = 'naver',
  KAKAO = 'kakao',
}

export enum SearchType {
  BOOK = 'book',
  BOOK_REVIEW_BY_TITLE = 'bookReviewTitle',
  BOOK_REVIEW_BY_AUTHOR = 'bookReviewAuthor',
  BOOK_REVIEW_BY_TAG = 'bookReviewTag',
  LIBRARY_BY_USERNAME = 'libraryUser',
}

/**
 * design system
 */
export enum ColorVariant {
  INHERIT = 'inherit',
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  LINE = 'line',
  ERROR = 'error',
  WARNING = 'warning',
}

export enum ButtonVariant {
  TEXT = 'text',
  CONTAINED = 'contained',
  OUTLINED = 'outlined',
}

export enum TextFieldVariant {
  TEXT = 'text',
  OUTLINED = 'outlined',
  BOTTOM_LINED = 'bottomLined',
}

export enum BoxVariant {
  ELEVATION = 'elevation',
  OUTLINED = 'outlined',
}

export enum Alignment {
  ROW = 'r',
  COLUMN = 'c',
}

export enum SideBarPosition {
  LEFT = 'l',
  RIGHT = 'r',
}

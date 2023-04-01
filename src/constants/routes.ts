enum Route {
  HOME = '/',
  SEARCH = '/search',
  SEARCH_RESULT_BY_BOOK = '/search/book',
  SEARCH_RESULT_BY_TAG = '/search/tag',
  SEARCH_RESULT_BY_CATEGORY = '/search/category',
  NEWBOOK_SEARCH = '/newbook/search',
  NEWBOOK_WRITE = '/newbook/write',
  BOOKREVIEW = '/bookreivew',
  SUBSCRIPTIONS = '/subscriptions',

  // [userId]/...
  LIBRARY = '/library',
}

export default Route;

enum Route {
  HOME = '/',
  SEARCH = '/search',
  SEARCH_RESULT_BY_BOOK = '/search/book',
  SEARCH_RESULT_BY_TAG = '/search/tag',
  NEWBOOK_SEARCH = '/newbook/search',
  NEWBOOK_WRITE = '/newbook/write',
  BOOKREVIEW = '/bookreivew',

  // [userId]/...
  LIBRARY = '/library',
  SUBSCRIPTIONS = '/subscriptions',
}

export default Route;

enum Route {
  HOME = '/',
  SEARCH = '/search',
  NEWBOOK_SEARCH = '/newbook/search',
  NEWBOOK_WRITE = '/newbook/write',
  BOOKREVIEW = '/bookreivew',

  // [userId]/...
  LIBRARY = '/library',
  FOLLOWER = '/follower',
  FOLLOWING = '/following',
  SUBSCRIPTIONS = '/subscriptions',
}

export default Route;

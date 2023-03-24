import ErrorBase from '@/lib/ErrorBase';

type UserErrorName =
  | 'USER_SIGNUP_ERROR'
  | 'GET_USER_ERROR'
  | 'GET_FOLLOWING_USER_LIST_ERROR'
  | 'GET_FOLLOWER_USER_LIST_ERROR'
  | 'UPDATE_USER_ERROR';

class UserError extends ErrorBase<UserErrorName> {}

export default UserError;

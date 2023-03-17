import ErrorBase from '@/lib/ErrorBase';

type UserErrorName =
  | 'USER_SIGNUP_ERROR'
  | 'GET_USER_ERROR'
  | 'UPDATE_USER_ERROR';

class UserError extends ErrorBase<UserErrorName> {}

export default UserError;

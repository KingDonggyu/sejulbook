import ErrorBase from '@/lib/ErrorBase';

type UserErrorName = 'GET_FOLLOW_INFO_ERROR';

class FollowError extends ErrorBase<UserErrorName> {}

export default FollowError;

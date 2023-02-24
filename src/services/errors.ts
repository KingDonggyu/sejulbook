import ErrorBase from '@/lib/ErrorBase';

type ErrorName = 'USER_SIGNUP_ERROR';

export class UserError extends ErrorBase<ErrorName> {}

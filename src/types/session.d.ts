import { InitilaizedUser, UserId } from './features/user';

export type SessionAfterLogin = { id: UserId };
export type SessionBeforeLogin = InitilaizedUser;

type Session = SessionBeforeLogin | SessionAfterLogin;

export default Session;

import { InitilaizedUser, UserId } from './features/user';

export type SessionAfterLogin = { id: UserId };
export type SessionBeforeLogin = InitilaizedUser;

type Session = SessionAfterLogin | SessionAfterLogin;

export default Session;

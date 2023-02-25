import nextAuth from 'next-auth';
import { InitilaizedUser, UserId } from './features/user';

export type SessionAfterLogin = { id: UserId };
export type SessionBeforeLogin = InitilaizedUser;

type CustomSession = SessionBeforeLogin | SessionAfterLogin;

declare module 'next-auth' {
  export type OriginSession = nextAuth.Session;
  export type Session = CustomSession;
}

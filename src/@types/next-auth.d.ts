import { Profile as OriginProfile } from 'next-auth';
import { SessionAfterLogin, SessionBeforeLogin } from './session.';

declare module 'next-auth' {
  export type Session = SessionAfterLogin | SessionBeforeLogin;
  interface Profile extends OriginProfile {
    id?: number | null;
  }
}

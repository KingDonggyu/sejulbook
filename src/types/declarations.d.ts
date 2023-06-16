/* eslint-disable @typescript-eslint/no-empty-interface */
import { Profile as OriginProfile } from 'next-auth';
import { lightTheme } from '@/styles/theme';
import { SessionAfterLogin, SessionBeforeLogin } from './session.';

/* next-auth */
declare module 'next-auth' {
  export type Session = SessionAfterLogin | SessionBeforeLogin;
  interface Profile extends OriginProfile {
    id?: number | null;
  }
}

/* emotion */
type CustomTheme = typeof lightTheme;

declare module '@emotion/react' {
  interface Theme extends CustomTheme {}
}

/* assets */
declare module '*.svg' {
  const src: string;
  export default src;
}

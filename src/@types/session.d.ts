declare module 'session' {
  import type { Age, Email, Gender, Id, Sub } from 'user';
  import { OAuthName } from '@/constants';

  export interface SessionAfterLogin {
    id: Id;
  }

  export interface SessionBeforeLogin {
    id: null;
    sub: Sub;
    gender: Gender;
    email: Email;
    age: Age;
    oAuth: OAuthName;
  }
}

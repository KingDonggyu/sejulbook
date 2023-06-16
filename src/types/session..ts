import { OAuthName } from '@/constants';
import { Age, Email, Gender, Id, Sub } from './user';

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

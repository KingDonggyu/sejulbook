/* eslint-disable no-param-reassign */
import { NextApiHandler } from 'next';
import NextAuth, { NextAuthOptions, Profile as P } from 'next-auth';
import KakaoProvider, { KakaoProfile } from 'next-auth/providers/kakao';
import NaverProvider, { NaverProfile } from 'next-auth/providers/naver';
import UserService from 'server/services/user/user.service';

import formatGenderToNumber from '@/utils/formatGenderToNumber';
import formatAgeRange from '@/utils/formatAgeRange';
import { OAuthName } from '@/constants';

const userService = new UserService();

const checkIsKakaoProfile = (profile: P) => 'kakao_account' in profile;

export const authOptions: NextAuthOptions = {
  secret: process.env.SEJULBOOK_NEXTAUTH_SECRET,

  providers: [
    KakaoProvider({
      clientId: process.env.SEJULBOOK_KAKAO_CLIENT_ID,
      clientSecret: process.env.SEJULBOOK_KAKAO_CLIENT_SECRET,
    }),
    NaverProvider({
      clientId: process.env.SEJULBOOK_NAVER_CLIENT_ID,
      clientSecret: process.env.SEJULBOOK_NAVER_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    signIn: async ({ profile }) => {
      if (!profile) {
        return false;
      }

      // id, sub 추가
      const sub: string = checkIsKakaoProfile(profile)
        ? (profile as KakaoProfile).id.toString()
        : (profile as NaverProfile).response.id;

      const { id } = await userService.findIdBySub(sub);

      profile.id = id;
      profile.sub = sub;

      return true;
    },

    jwt: ({ profile, token }) => {
      if (!profile) {
        return token;
      }

      // 로그인 o - SessionAfterLogin 타입 반환
      if (typeof profile.id === 'number') {
        return { id: profile.id };
      }

      // 로그인 x - SessionBeforeLogin 타입 반환
      // - 카카오 로그인 정보
      if (checkIsKakaoProfile(profile)) {
        const { kakao_account: kakao } = profile as KakaoProfile;

        return {
          id: null,
          sub: profile.sub,
          email: kakao?.email,
          gender: formatGenderToNumber(kakao?.gender),
          age: kakao?.age_range ? formatAgeRange(kakao?.age_range) : null,
          oAuth: OAuthName.KAKAO,
        };
      }

      // - 네이버 로그인 정보
      const { response: naver } = profile as NaverProfile;

      return {
        id: null,
        sub: profile.sub,
        email: naver.email,
        gender: formatGenderToNumber(naver.gender),
        age: naver.age ? formatAgeRange(naver.age) : null,
        oAuth: OAuthName.NAVER,
      };
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    session: ({ token }): any => {
      // 로그인 o - SessionAfterLogin 타입 반환
      if (token.id) {
        return { id: token.id };
      }

      // 로그인 x - SessionBeforeLogin 타입 반환
      return {
        id: null,
        sub: token.sub,
        email: token.email,
        gender: token.gender,
        age: token.age,
        oAuth: token.oAuth,
      };
    },
  },
};

const authHandler: NextApiHandler = (req, res) => {
  if (req.query.error) {
    res.redirect('/');
    return;
  }

  NextAuth(req, res, authOptions);
};

export default authHandler;

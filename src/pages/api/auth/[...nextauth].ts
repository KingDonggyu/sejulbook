/* eslint-disable no-param-reassign */
import { NextApiHandler } from 'next';
import NextAuth, {
  Session,
  NextAuthOptions,
  Profile as OriginProfile,
  OriginSession,
} from 'next-auth';
import KakaoProvider, { KakaoProfile } from 'next-auth/providers/kakao';
import NaverProvider, { NaverProfile } from 'next-auth/providers/naver';
import userService from 'server/features/user/user.service';
import formatGenderToNumber from '@/utils/formatGenderToNumber';
import formatAgeRange from '@/utils/formatAgeRange';
import { OAuthName } from '@/constants';

type Profile = OriginProfile & Session;

const isKakaoProfile = (profile: OriginProfile) => 'kakao_account' in profile;

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

      const userInfo: Pick<Profile, 'id' | 'sub'> = { id: null, sub: '' };

      userInfo.sub = isKakaoProfile(profile)
        ? (profile as KakaoProfile).id.toString()
        : (profile as NaverProfile).response.id;

      const response = await userService.getUserId({ sub: userInfo.sub });

      if (!response.error) {
        userInfo.id = response.data.id;
      }

      (profile as Profile).id = userInfo.id;
      (profile as Profile).sub = userInfo.sub;

      return true;
    },

    jwt: ({ profile: originProfile, token }) => {
      if (!originProfile) {
        return token;
      }

      const profile = originProfile as Profile;

      if (profile.id) {
        return { id: profile.id };
      }

      const user: Partial<Session> = {
        id: null,
        sub: String(profile.sub),
      };

      if (isKakaoProfile(profile)) {
        const { kakao_account: kakao } = originProfile as KakaoProfile;

        user.email = kakao?.email;
        user.gender = formatGenderToNumber(kakao?.gender);
        user.age = kakao?.age_range ? formatAgeRange(kakao?.age_range) : null;
        user.oAuth = OAuthName.KAKAO;

        return user;
      }

      const { response: naver } = originProfile as NaverProfile;

      user.email = naver.email;
      user.gender = formatGenderToNumber(naver.gender);
      user.age = naver.age ? formatAgeRange(naver.age) : null;
      user.oAuth = OAuthName.NAVER;

      return user;
    },

    session: ({ token }) => {
      if (token.id) {
        return { id: token.id } as OriginSession;
      }

      return {
        id: token.id,
        sub: token.sub,
        email: token.email,
        gender: token.gender,
        age: token.age,
        oAuth: token.oAuth,
      } as OriginSession;
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

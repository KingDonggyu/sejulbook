/* eslint-disable no-param-reassign */
import { NextApiHandler } from 'next';
import NextAuth, {
  AuthOptions,
  Session,
  Profile as OriginProfile,
} from 'next-auth';
import KakaoProvider, { KakaoProfile } from 'next-auth/providers/kakao';
import NaverProvider, { NaverProfile } from 'next-auth/providers/naver';
import UserService from 'server/user/user.service';
import { InitilaizedUser } from '@/types/domain/user';
import formatGenderToNumber from '@/utils/formatGenderToNumber';
import formatAgeRange from '@/utils/formatAgeRange';

type Profile = OriginProfile & InitilaizedUser;

const isKakaoProfile = (profile: OriginProfile) => 'kakao_account' in profile;

const options: AuthOptions = {
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID,
      clientSecret: process.env.NAVER_CLIENT_SECRET,
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

      userInfo.id = await UserService.getUserId({ sub: userInfo.sub });

      (profile as Profile).id = userInfo.id;
      (profile as Profile).sub = userInfo.sub;

      return true;
    },

    jwt: ({ profile: originProfile, token }) => {
      if (!originProfile) {
        return token;
      }

      const profile = originProfile as Profile;

      if (isKakaoProfile(profile)) {
        const { kakao_account: kakao } = originProfile as KakaoProfile;

        return {
          id: profile.id,
          sub: profile.sub,
          gender: formatGenderToNumber(kakao?.gender),
          age: kakao?.age_range ? formatAgeRange(kakao?.age_range) : null,
        };
      }

      const { response: naver } = originProfile as NaverProfile;

      return {
        id: profile.id,
        sub: profile.sub,
        gender: formatGenderToNumber(naver.gender),
        age: naver.age ? formatAgeRange(naver.age) : null,
      };
    },

    session: ({ token }) => {
      if (token.id) {
        return { id: token.id } as unknown as Session;
      }

      return {
        id: token.id,
        sub: token.sub,
        email: token.email,
        gender: token.gender,
        age: token.age,
      } as unknown as Session;
    },
  },
};

const authHandler: NextApiHandler = (req, res) => {
  if (req.query.error) {
    res.redirect('/');
    return;
  }
  NextAuth(req, res, options);
};

export default authHandler;

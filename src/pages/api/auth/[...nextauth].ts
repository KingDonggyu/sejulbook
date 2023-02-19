import { NextApiHandler } from 'next';
import NextAuth, { AuthOptions, Profile } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import KakaoProvider, { KakaoProfile } from 'next-auth/providers/kakao';
import NaverProvider, { NaverProfile } from 'next-auth/providers/naver';
import UserService from 'server/user/user.service';
import { UserId } from '@/types/domain/user';

const isKakaoProfile = (profile: Profile) => 'kakao_account' in profile;

const options: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
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
      let userId: UserId | null;

      if (!profile) {
        return false;
      }

      if (isKakaoProfile(profile)) {
        const { id } = profile as KakaoProfile;
        userId = await UserService.getUserId({ sub: id.toString() });
      } else {
        const { response } = profile as NaverProfile;
        userId = await UserService.getUserId({ sub: response.id });
      }

      if (userId) {
        return true;
      }
      return false;
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

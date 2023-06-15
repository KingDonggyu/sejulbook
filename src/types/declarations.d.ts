import { lightTheme } from '@/styles/theme';

type CustomTheme = typeof lightTheme;

declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends CustomTheme {}
}

declare namespace NodeJS {
  export interface ProcessEnv {
    NEXTAUTH_SECRET: string;
    SEJULBOOK_BASE_URL: string;

    SEJULBOOK_KAKAO_CLIENT_ID: string;
    SEJULBOOK_KAKAO_CLIENT_SECRET: string;
    SEJULBOOK_NAVER_CLIENT_ID: string;
    SEJULBOOK_NAVER_CLIENT_SECRET: string;

    NEXT_PUBLIC_KAKAO_REST_API_KEY: string;
    NEXT_PUBLIC_TINY_API_KEY: string;
    NEXT_PUBLIC_AWS_ACCESS_KEY: string;
    NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY: string;
    NEXT_PUBLIC_AWS_REGION: string;
    NEXT_PUBLIC_S3_BUCKET_NAME: string;
    NEXT_PUBLIC_GA_ID: string;
    NEXT_PUBLIC_DATABASE_URL: string;
    NEXT_PUBLIC_IS_LOCAL?: 'true';
  }
}

declare module '*.svg' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

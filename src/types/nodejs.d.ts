declare namespace NodeJS {
  export interface ProcessEnv {
    BASE_URL: string;
    KAKAO_CLIENT_ID: string;
    KAKAO_CLIENT_SECRET: string;
    NAVER_CLIENT_ID: string;
    NAVER_CLIENT_SECRET: string;
    NEXTAUTH_SECRET: string;
    NEXT_PUBLIC_KAKAO_REST_API_KEY: string;
    NEXT_PUBLIC_TINY_API_KEY: string;
    S3_BUCKET_NAME: string;
    AWS_ACCESS_KEY: string;
    AWS_SECRET_ACCESS_KEY: string;
    AWS_REGION: string;
  }
}

declare namespace NodeJS {
  export interface ProcessEnv {
    PLANETSCALE_DB_HOST: string;
    PLANETSCALE_DB_USERNAME: string;
    PLANETSCALE_DB: string;
    PLANETSCALE_DB_PASSWORD: string;

    SEJULBOOK_LOCAL_DB_HOST: string;
    SEJULBOOK_LOCAL_DB_USER: string;
    SEJULBOOK_LOCAL_DB_DATABASE: string;
    SEJULBOOK_LOCAL_DB_PORT: string;
    SEJULBOOK_LOCAL_DB_PASSWORD: string;
  }
}

declare namespace NodeJS {
  export interface ProcessEnv {
    SEJULBOOK_DB_HOST: string;
    SEJULBOOK_DB_USER: string;
    SEJULBOOK_DB_DATABASE: string;
    SEJULBOOK_DB_PASSWORD: string;

    SEJULBOOK_LOCAL_DB_HOST: string;
    SEJULBOOK_LOCAL_DB_USER: string;
    SEJULBOOK_LOCAL_DB_DATABASE: string;
    SEJULBOOK_LOCAL_DB_PORT: string;
    SEJULBOOK_LOCAL_DB_PASSWORD: string;
  }
}

declare namespace NodeJS {
  export interface ProcessEnv {
    DB_HOST: string;
    DB_USER: string;
    DB_DATABASE: string;
    DB_PASSWORD: string;
    LOCAL_DB_HOST: string;
    LOCAL_DB_USER: string;
    LOCAL_DB_DATABASE: string;
    LOCAL_DB_PORT: string;
    LOCAL_DB_PASSWORD: string;
  }
}

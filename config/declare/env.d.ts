declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_ENV: 'mock' | 'dev' | 'test' | 'prod';
    NEXT_PUBLIC_APPNAME: string;
    NEXT_PUBLIC_API_URL: string;
  }
}

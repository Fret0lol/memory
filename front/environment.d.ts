export {}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // [key: string]: string | undefined;
      PORT: string;
      DATABASE_URL: string;
      REACT_APP_GOOGLE_CLIENT_ID: string;
      // add more environment variables and their types here
    }
  }
}
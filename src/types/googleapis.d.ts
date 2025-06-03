declare module 'googleapis' {
  export const google: any;
}

declare module 'google-auth-library' {
  export class GoogleAuth {
    constructor(options: {
      credentials: {
        client_email: string;
        private_key: string;
      };
      scopes: string[];
    });
  }
} 
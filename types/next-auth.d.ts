import 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
  interface User {
    id: string;
    email: string;
    first_name?: string;
    last_name?: string;
    domain?: string;
    accessToken?: string;
    client?: string;
    uid?: string;
    tokenType?: string;
    expiry?: string;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      first_name?: string;
      last_name?: string;
      domain?: string;
    };
    accessToken?: string;
    client?: string;
    uid?: string;
    tokenType?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    email: string;
    first_name?: string;
    last_name?: string;
    domain?: string;
    accessToken?: string;
    client?: string;
    uid?: string;
    tokenType?: string;
    expiry?: string;
    accessTokenExpires?: number;
    error?: string;
  }
}

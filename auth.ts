import NextAuth from 'next-auth';
import type { NextAuthConfig } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
  domain: z.enum(['user', 'console', 'kanri']).optional(),
  otpCode: z.string().min(6).max(6),
});

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

interface ConfirmOtpResponse {
  data: {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
  };
}

interface AuthHeaders {
  accessToken: string | null;
  tokenType: string | null;
  client: string | null;
  expiry: string | null;
  uid: string | null;
}

async function authenticateUser(credentials: {
  email: string;
  password: string;
  domain?: string;
  otpCode: string;
}) {
  try {
    const domain = credentials.domain || 'user';

    const response = await fetch(`${baseUrl}/api/managers/confirm_otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        manager: {
          email: credentials.email,
          password: credentials.password,
          otp_code: credentials.otpCode,
        },
      }),
    });

    console.log('OTP confirm response status:', response);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('OTP confirmation failed:', response.status, errorData);

      return null;
    }

    const data: ConfirmOtpResponse = await response.json();
    console.log('OTP confirmation success:', data);

    const authHeaders: AuthHeaders = {
      accessToken: response.headers.get('access-token'),
      tokenType: response.headers.get('token-type'),
      client: response.headers.get('client'),
      expiry: response.headers.get('expiry'),
      uid: response.headers.get('uid'),
    };

    console.log('Auth headers:', authHeaders);

    if (!authHeaders.accessToken) {
      console.error('No access token in response headers');

      return null;
    }

    return {
      id: data.data.id.toString(),
      email: data.data.email,
      first_name: data.data.first_name,
      last_name: data.data.last_name,
      domain: domain,
      accessToken: authHeaders.accessToken,
      client: authHeaders.client ?? undefined,
      uid: authHeaders.uid ?? undefined,
      tokenType: authHeaders.tokenType ?? undefined,
      expiry: authHeaders.expiry ?? undefined,
    };
  } catch (error) {
    console.error('Authentication error:', error);

    return null;
  }
}

async function refreshAccessToken(token: JWT) {
  try {
    console.log('Token refresh not implemented yet');

    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  } catch (error) {
    console.error('Token refresh error:', error);

    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}

export const authConfig: NextAuthConfig = {
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        domain: { label: 'Domain', type: 'text' },
        otpCode: { label: 'OTP Code', type: 'text' },
      },
      async authorize(credentials) {
        console.log('🔍 Authorize called with:', {
          email: credentials?.email,
          domain: credentials?.domain,
          hasOtpCode: !!credentials?.otpCode,
        });

        const validatedFields = loginSchema.safeParse(credentials);

        if (!validatedFields.success) {
          console.error('Validation failed:', validatedFields.error);

          return null;
        }

        const result = await authenticateUser({
          email: validatedFields.data.email,
          password: validatedFields.data.password,
          domain: validatedFields.data.domain,
          otpCode: validatedFields.data.otpCode,
        });

        console.log('Authorize result:', result ? 'SUCCESS' : 'FAILED');

        return result;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      console.log('JWT callback:', {
        hasUser: !!user,
        hasAccount: !!account,
        tokenId: token.id,
      });

      if (account && user) {
        console.log('🆕 New login, setting up token');

        return {
          ...token,
          id: user.id,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          domain: user.domain,
          accessToken: user.accessToken,
          client: user.client,
          uid: user.uid,
          tokenType: user.tokenType,
          expiry: user.expiry,
          accessTokenExpires: user.expiry
            ? parseInt(user.expiry) * 1000
            : Date.now() + 24 * 60 * 60 * 1000,
        };
      }

      if (token.accessTokenExpires && Date.now() < token.accessTokenExpires) {
        return token;
      }

      console.log('Token expired, should refresh...');

      return await refreshAccessToken(token);
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.first_name = token.first_name;
        session.user.last_name = token.last_name;
        session.user.domain = token.domain;
        session.accessToken = token.accessToken;
        session.client = token.client;
        session.uid = token.uid;
        session.tokenType = token.tokenType;
      }

      return session;
    },
    async redirect({ baseUrl }) {
      const urlObj = new URL(baseUrl);
      const hostname = urlObj.hostname;
      const port = urlObj.port;
      const fullHost = port ? `${hostname}:${port}` : hostname;

      return `${urlObj.protocol}//${fullHost}/login`;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60,
  },
  secret: process.env.AUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
};

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig);

import { redirect } from 'next/navigation';
import createClient, { Client } from 'openapi-fetch';
import type { paths } from '@/lib/api/api-types';

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const apiClient = createClient<paths>({
  baseUrl: baseUrl,
});

function addAuthMiddleware(client: Client<paths, `${string}/${string}`>) {
  if (typeof window !== 'undefined') {
    client.use({
      async onRequest({ request }: { request: Request }) {
        const session = await fetch('/api/auth/session').then((res) =>
          res.json(),
        );

        if (session?.accessToken) {
          request.headers.set('access-token', session.accessToken);
          request.headers.set('client', session.client || '');
          request.headers.set('uid', session.uid || '');
          request.headers.set('token-type', session.tokenType || 'Bearer');
        }

        return request;
      },
      async onResponse({ response }: { response: Response }) {
        console.log('API Response:', response.status);

        if (response.status === 401) {
          redirect('/login');
        }

        return response;
      },
    });
  }
}

addAuthMiddleware(apiClient);

export { apiClient };

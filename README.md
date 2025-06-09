This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Setup

1. **Install dependencies**

```bash
pnpm install
```

2. **Set up environment variables**

Copy the example environment file and update the values:

```bash
cp .env.example .env.local
```

3. **Run the development server**

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

The project is configured to deploy automatically to Vercel via GitHub Actions. Every commit to the `main` branch will trigger a build and deploy to production.

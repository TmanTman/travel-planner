This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Pre-commit hooks

The Typescript check was added according to this article: https://javascript.plainenglish.io/catch-typescript-errors-in-nextjs-before-building-your-app-df129682ee5c

## DB Operations

It's new to me how I can develop against remove databases

1. migration
2. push

The migration needs access to env vars. It can load it itself.
Push, however, is just drizzle-kit push:pg. It's not a script. So it needs it in the environment.
drizzle.config.ts can load from local, using

import \* as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

Not sure how that can run differently on development and prod. Can it be executed conditionally based on environment?

Loading env vars into the terminal for npm scripts:
set -o allexport && source .env.local && set +o allexport

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

Lessons:

1. The way of connecting to databases through different tools, vercel/postgres and pg, isn't ideal. Since Vercel doesn't offer branching yet.
2. Loading states: I suspect you can simplify file structure if you use client-side loading states. Client side code can have 1 component with loading, error and content. Now you need a parent with all Suspense boundarier, then load state, content state, and error state
3. Preventing rebuilding and re-renders: Again I suspect you can significantly simplify file structure and not have to think about server vs client components. My file structure to prevent re-renders on the Sidebar is an example
4. Firebase authention is tricky on NextJS. (1) Hot-reload of server components will re-initialise app (2) In the Firebase console, you seem to have to enable a single auth method (I enabled anonymous), even if you use your own + Firebase auth, to allow Firebase auth to work.
5. I'd like to switch off further usage of the APIs in case it runs away, but that's not very straightforward. You have to run some script, with who-knows what APIs that has to be enabled, and testing that function on Google Cloud UI is terrible.

Database structure:
queue: The server has write access to it
Firebase functions: Processes the queue. Gets the response. Writes the response.
messages: {
[messageId]: [timeOfLastMessage]
}
messages: {
[userId]: { // Auth: Has to be the user
[threadId]: [timeOfLastMessage]
}
}
Setting the authentication token:

1. The <Layout> for the authed section gets the JWT
2. Each chat has a <ClientComponent> which listens for new messages. If it happens, triggers a reload

Loading indicator? This is a next step, but it'll be
messages: {
[userId]: { // Auth: Has to be the user
[threadId]: {
status: loading,
lastLoadedMessage: [timeOfLastMessage]
}
}
}

TODO:
Add Sentry for API errors?
Automatically scroll down if at bottom of Q&A
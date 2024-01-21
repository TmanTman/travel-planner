import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { Suspense } from "react";
import { HomeAuthButtons } from "./(components)/home-auth-buttons";

export default function Page() {
  return (
    <main>
      <h1>Travel Planner</h1>
      <Suspense fallback={<div>...</div>}>
        <HomeAuthButtons />
      </Suspense>
    </main>
  );
}

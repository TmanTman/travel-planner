import { SignInButton, SignUpButton } from "@clerk/nextjs";

export default function Page() {
  return (
    <main>
      <h1>Travel Planner</h1>
      <SignUpButton />
      <SignInButton />
    </main>
  );
}

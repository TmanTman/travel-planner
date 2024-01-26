import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";

export const HomeAuthButtons = async () => {
  const user = await currentUser();
  return user ? (
    <Link href="/travel/new">Log in</Link>
  ) : (
    <>
      <SignUpButton />
      <SignInButton />
    </>
  );
};

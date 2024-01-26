"use server";

import { auth as adminAuth } from "firebase-admin";
import { currentUser } from "@clerk/nextjs/server";
import { FirebaseProvider } from "../firebase-provider";
import { getFirebaseAdminApp } from "@/firebase/get-firebase-admin-app";

const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

if (!serviceAccount) {
  throw new Error("Missing FIREBASE_SERVICE_ACCOUNT_KEY");
}

interface Props {
  children: React.ReactNode;
}

export const FirebaseAuth = async ({ children }: Props) => {
  getFirebaseAdminApp();
  const user = await currentUser();

  let token = "";
  if (user) {
    token = await adminAuth().createCustomToken(user.id, {
      userId: user.id,
    });
  }

  return <FirebaseProvider token={token}>{children}</FirebaseProvider>;
};

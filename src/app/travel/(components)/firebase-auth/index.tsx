"use server";

import {
  initializeApp as initializeAdminApp,
  App as AdminApp,
  getApps as getAdminApps,
} from "firebase-admin/app";
import { credential, auth as adminAuth } from "firebase-admin";
import { currentUser } from "@clerk/nextjs/server";
import { FirebaseProvider } from "../firebase-provider";

const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

if (!serviceAccount) {
  throw new Error("Missing FIREBASE_SERVICE_ACCOUNT_KEY");
}

const getAdminApp = () => {
  let app: AdminApp | null = null;
  if (getAdminApps().length === 0) {
    app = initializeAdminApp({
      credential: credential.cert(JSON.parse(serviceAccount)),
      databaseURL:
        "https://travel-planner-c06e5-default-rtdb.europe-west1.firebasedatabase.app",
    });
  } else {
    app = getAdminApps()[0];
  }
  return app;
};

interface Props {
  children: React.ReactNode;
}

export const FirebaseAuth = async ({ children }: Props) => {
  getAdminApp();
  const user = await currentUser();

  let token = "";
  if (user) {
    token = await adminAuth().createCustomToken(user.id, {
      userId: user.id,
    });
  }

  // TODO: This handles the authentication
  // how do I handle the realtime database?
  // Should it be a provider that maintains a single connection?
  return <FirebaseProvider token={token}>{children}</FirebaseProvider>;
};

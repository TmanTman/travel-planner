import "server-only";

import {
  initializeApp as initializeAdminApp,
  App as AdminApp,
  getApps as getAdminApps,
} from "firebase-admin/app";
import { credential } from "firebase-admin";

const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

if (!serviceAccount) {
  throw new Error("Missing FIREBASE_SERVICE_ACCOUNT_KEY");
}

export const getFirebaseAdminApp = () => {
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

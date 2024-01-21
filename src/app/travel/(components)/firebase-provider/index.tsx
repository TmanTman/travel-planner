"use client";

import { FirebaseApp, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithCustomToken } from "firebase/auth";
import { useContext, useEffect, useRef, useState } from "react";
import { getDatabase, Database as FirebaseDatabase } from "firebase/database";

interface Props {
  token: string;
  children: React.ReactNode;
}

const firebaseConfig = {
  apiKey: "AIzaSyD40j39FvVNl8TpVnqY7Gg3VUYpp056ryg",
  authDomain: "travel-planner-c06e5.firebaseapp.com",
  databaseURL:
    "https://travel-planner-c06e5-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "travel-planner-c06e5",
  storageBucket: "travel-planner-c06e5.appspot.com",
  messagingSenderId: "413803052489",
  appId: "1:413803052489:web:7968d9d4e3b474d931bc18",
  measurementId: "G-TWKHQDMZ15",
};

import { createContext } from "react";

export const FirebaseDbContext = createContext<FirebaseDatabase | null>(null);
export const useFirebaseDb = () => useContext(FirebaseDbContext);

/*
 * At the time of writing, the reactfire library wasn't updated to work with
 * the latest version of Firebase (v10).
 * The manual integration into React seemed relatively straightforward,
 * but it can definitely be implemented with reactfire if/when it makes sense
 */
export const FirebaseProvider = ({ token, children }: Props) => {
  // ref is used to ensure single instantiation
  let ref = useRef<FirebaseApp | null>(null);
  const [db, setDb] = useState<FirebaseDatabase | null>(null);

  useEffect(() => {
    const firebaseClientAuth = async () => {
      if (ref.current === null) {
        const app = initializeApp(firebaseConfig);
        ref.current = app;
        getAnalytics(app);
        const auth = getAuth();
        const db = getDatabase();
        setDb(db);
        // Does all further requests to Firebase
        // include the authentication details? I assume so
        await signInWithCustomToken(auth, token);
      }
    };
    firebaseClientAuth();
  }, [token]);

  return (
    <FirebaseDbContext.Provider value={db}>
      {children}
    </FirebaseDbContext.Provider>
  );
};

"use client";

import { useFirebaseDb } from "@/app/travel/(components)/firebase-provider";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { ref, onValue } from "firebase/database";

interface Props {
  topicId: string;
}

export const MessageReponseObserver = ({ topicId }: Props) => {
  const db = useFirebaseDb();
  const auth = useUser();

  useEffect(() => {
    if (db && auth && auth.user) {
      const messagesRef = ref(db, `/messages/${auth.user.id}/${topicId}`);
      onValue(messagesRef, (snapshot) => {
        const data = snapshot.val();
        // eslint-disable-next-line no-console
        console.log("data", data);
      });
    }
  });

  return <></>;
};

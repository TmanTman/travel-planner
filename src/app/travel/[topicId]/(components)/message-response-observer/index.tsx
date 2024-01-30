"use client";

import { useFirebaseDb } from "@/app/travel/(components)/firebase-provider";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { ref, onValue } from "firebase/database";
import dayjs from "dayjs";

interface Props {
  topicId: string;
  mostRecentMessageCreatedAt: string | undefined;
  onUpdate: () => void;
}

export const MessageReponseObserver = ({
  topicId,
  mostRecentMessageCreatedAt,
  onUpdate,
}: Props) => {
  const db = useFirebaseDb();
  const auth = useUser();

  useEffect(() => {
    if (db && auth && auth.user) {
      const messagesRef = ref(db, `messages/${auth.user.id}/${topicId}`);
      const unsubscribe = onValue(messagesRef, (snapshot) => {
        const data = snapshot.val() as string;
        // eslint-disable-next-line no-console
        const responseAt = dayjs(data);
        if (
          mostRecentMessageCreatedAt &&
          responseAt &&
          responseAt.isAfter(mostRecentMessageCreatedAt)
        ) {
          onUpdate();
        }
      });
      return () => {
        unsubscribe();
      };
    }
  }, [auth, db, mostRecentMessageCreatedAt, onUpdate, topicId]);

  return <></>;
};

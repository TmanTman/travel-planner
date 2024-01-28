"use client";

import { useFirebaseDb } from "@/app/travel/(components)/firebase-provider";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { ref, onValue } from "firebase/database";
import dayjs from "dayjs";
import { Message } from "@/database/schema";

interface Props {
  topicId: string;
  mostRecentMessage: Message | undefined;
  onUpdate: () => void;
}

export const MessageReponseObserver = ({
  topicId,
  mostRecentMessage,
  onUpdate,
}: Props) => {
  const db = useFirebaseDb();
  const auth = useUser();

  useEffect(() => {
    if (db && auth && auth.user) {
      const messagesRef = ref(
        db,
        `development-messages/${auth.user.id}/${topicId}`
      );
      onValue(messagesRef, (snapshot) => {
        const data = snapshot.val() as string;
        // eslint-disable-next-line no-console
        const responseAt = dayjs(data);
        if (!mostRecentMessage) {
          onUpdate();
        }
        // TODO: Find better way for API + Drizzle to respond with UTC ISO timestamp
        const mostRecentMessageCreatedAt = dayjs(
          mostRecentMessage?.createdAt + "+00:00"
        );
        if (responseAt.isAfter(mostRecentMessageCreatedAt)) {
          onUpdate();
        }
      });
    }
  });

  return <></>;
};

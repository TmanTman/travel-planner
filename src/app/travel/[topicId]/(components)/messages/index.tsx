import { db } from "@/database/db";
import clsx from "clsx";

import classes from "./index.module.css";
import { currentUser } from "@clerk/nextjs";
import { MessageForm } from "../message-form";

interface Props {
  topicId: string;
}

export default async function Messages({ topicId }: Props) {
  async function fetchMessages(topicId: number) {
    "use server";
    return db.query.messageTable.findMany({
      where: (message, { eq }) => eq(message.topicId, topicId),
    });
  }

  const user = await currentUser();
  const messages =
    topicId === "new" ? [] : await fetchMessages(parseInt(topicId));

  return (
    <div className={classes.ChatContainer}>
      <div className={classes.ChatHistory}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={clsx(
              classes.ChatBubble,
              message.userId === user!.id && classes.ChatBubbleUser
            )}
          >
            {message.text}
          </div>
        ))}
      </div>
      <MessageForm userId={user!.id} topicId={topicId} />
    </div>
  );
}

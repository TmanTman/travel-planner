"use server";

import { db } from "@/database/db";
import { messageTable, topicTable } from "@/database/schema";
import { getDatabase } from "firebase-admin/database";
import { getFirebaseAdminApp } from "@/firebase/get-firebase-admin-app";
import dayjs from "dayjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const generateRandom = () =>
  [...Array(4)].map(() => Math.random().toString(36)[2]).join("");

const taskQueue = process.env.TASK_QUEUE;
if (!taskQueue) {
  throw Error('Missing env var "TASK_QUEUE"');
}

export async function createMessage(formData: FormData) {
  // Comparison: Traditional API vs NextJS Server-side function call
  // Validation: The serializer would have validated the data, returned 400 response if bad
  // This is probably the role of Zod
  // Zod isn't integrated with the ORM, so checking for valid foreign keys is tricky

  const { topicId, userId, text } = Object.fromEntries(formData.entries());
  const created = dayjs().toISOString();
  let databaseTopicId: number;

  if (topicId === "new") {
    const newTopic = await db
      .insert(topicTable)
      .values({
        title: `Topic ${generateRandom()}`,
        userId: userId as string,
        createdAt: created,
      })
      .returning({ id: topicTable.id });
    databaseTopicId = newTopic[0].id;
  } else {
    databaseTopicId = parseInt(topicId as string);
  }

  const insertedMessage = await db
    .insert(messageTable)
    .values({
      text: text as string,
      userId: userId as string,
      createdAt: created,
      topicId: databaseTopicId,
    })
    .returning({ id: messageTable.id });

  getFirebaseAdminApp();
  const firebaseDatabase = getDatabase();
  const tasksRef = firebaseDatabase.ref(taskQueue);
  tasksRef.child(insertedMessage[0].id.toString()).set({
    topicId: databaseTopicId,
    messageId: insertedMessage[0].id,
    userId: userId,
  });

  revalidatePath(`/travel/${databaseTopicId}`);
  redirect(`/travel/${databaseTopicId}`);
}

"use server";

import { db } from "@/database/db";

export const fetchTopics = async (userId: string) => {
  return db.query.topicTable.findMany({
    where: (topic, { eq }) => eq(topic.userId, userId),
  });
};

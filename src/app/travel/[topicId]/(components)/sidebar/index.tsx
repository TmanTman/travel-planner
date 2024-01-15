import classes from "./index.module.css";
import { db } from "@/database/db";
import { currentUser } from "@clerk/nextjs";
import clsx from "clsx";
import Link from "next/link";

interface Props {
  topicId: string;
  className: string;
}

export default async function Sidebar({ className, topicId }: Props) {
  async function fetchTopics(userId: string) {
    "use server";
    return db.query.topicTable.findMany({
      where: (topic, { eq }) => eq(topic.userId, userId),
    });
  }

  const user = await currentUser();
  console.log("user", user);
  const topics = await fetchTopics(user!.id);
  console.log("topics", topics);

  return (
    <div className={className}>
      {topics.map((topic) => (
        <Link href={`/travel/${topic.id}`} key={topic.id}>
          <div
            className={clsx(
              classes.Chat,
              topicId === String(topic.id) && classes.ActiveTopic
            )}
          >
            {topic.title}
          </div>
        </Link>
      ))}
      <Link href={`/travel/new`}>
        <div className={classes.Chat}>+ New topic</div>
      </Link>
    </div>
  );
}

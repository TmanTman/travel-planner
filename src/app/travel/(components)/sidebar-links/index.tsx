"use client";

import classes from "./index.module.css";
import clsx from "clsx";
import Link from "next/link";
import { Topic } from "@/database/schema";
import { usePathname } from "next/navigation";

interface Props {
  topics: Topic[];
}

export const SidebarLinks = ({ topics }: Props) => {
  const pathname = usePathname();
  return (
    <>
      {topics.map((topic) => (
        <Link href={`/travel/${topic.id}`} key={topic.id}>
          <div
            className={clsx(
              classes.Topic,
              pathname === `/travel/${topic.id}` && classes.ActiveTopic
            )}
          >
            {topic.title}
          </div>
        </Link>
      ))}
      <Link href={`/travel/new`}>
        <div className={classes.Chat}>+ New topic</div>
      </Link>
    </>
  );
};

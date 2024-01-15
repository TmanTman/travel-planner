import Sidebar from "./(components)/sidebar";
import Messages from "./(components)/messages";

import classes from "./page.module.css";

interface Props {
  params: {
    topicId: string;
  };
}

export default function Page({ params: { topicId } }: Props) {
  return (
    <div className={classes.Container}>
      <Sidebar className={classes.Sidebar} topicId={topicId} />
      <Messages className={classes.Chat} topicId={topicId} />
    </div>
  );
}

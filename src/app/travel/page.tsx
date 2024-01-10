import { Sidebar } from "./(components)/sidebar";
import { Chat } from "./(components)/chat";

import classes from "./page.module.css";

export default function Page() {
  return (
    <div className={classes.Container}>
      <Sidebar className={classes.Sidebar} />
      <Chat className={classes.Chat} />
    </div>
  );
}

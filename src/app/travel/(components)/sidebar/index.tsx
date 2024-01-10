import { chats as mockChats } from "./mock";
import classes from "./index.module.css";

interface SidebarProps {
  className: string;
}

export const Sidebar = ({ className }: SidebarProps) => {
  const chats = mockChats;
  return (
    <div className={className}>
      {chats.map((chat, index) => {
        return (
          <div className={classes.Chat} key={chat.id}>
            {chat.subject}
          </div>
        );
      })}
    </div>
  );
};

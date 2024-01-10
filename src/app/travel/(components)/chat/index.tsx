"use client";

import clsx from "clsx";
import { ChangeEvent, useCallback, useRef, useState } from "react";

import classes from "./index.module.css";
import { messages } from "./mock";

type ChatProps = {
  className: string;
};

export const Chat = ({ className }: ChatProps) => {
  const ref = useRef<HTMLTextAreaElement>(null);
  const [userQuery, setUserQuery] = useState("");
  const chatHistory = messages;

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      if (ref?.current) {
        ref.current.style.height = "auto";
        ref.current.style.height = ref.current.scrollHeight + "px";
      }
      setUserQuery(event.target.value);
    },
    []
  );

  return (
    <div className={clsx(className, classes.ChatContainer)}>
      <div className={classes.ChatHistory}>
        {chatHistory.map((message, index) => (
          <div
            key={index}
            className={clsx(
              classes.ChatBubble,
              message.sender === "me" && classes.ChatBubbleUser
            )}
          >
            {message.text}
          </div>
        ))}
      </div>
      <div>
        <form>
          <textarea
            ref={ref}
            className={classes.Input}
            onChange={handleChange}
            value={userQuery}
          />
        </form>
      </div>
    </div>
  );
};

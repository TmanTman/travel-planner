"use client";

import { ChangeEvent, useCallback, useRef, useState } from "react";
import { createMessage } from "./create-message";

import classes from "./index.module.css";

interface Props {
  topicId: string;
  userId: string;
}

export const MessageForm = ({ topicId, userId }: Props) => {
  const ref = useRef<HTMLTextAreaElement>(null);
  const [userQuery, setUserQuery] = useState("");

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
    <div className={classes.Form}>
      <form action={createMessage}>
        <input type="hidden" name="topicId" value={topicId} />
        <input type="hidden" name="userId" value={userId} />
        <textarea
          name="text"
          ref={ref}
          className={classes.Input}
          onChange={handleChange}
          value={userQuery}
        />
        <div className={classes.Submit}>
          <button type="submit">Send</button>
        </div>
      </form>
    </div>
  );
};

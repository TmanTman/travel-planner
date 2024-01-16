import { Suspense } from "react";
import Sidebar from "./(components)/sidebar";
import classes from "./index.module.css";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div className={classes.Container}>
      <div className={classes.Sidebar}>
        <Suspense fallback={<div style={{ color: "white" }}>Loading...</div>}>
          <Sidebar />
        </Suspense>
      </div>
      <div className={classes.Chat}>{children}</div>
    </div>
  );
}

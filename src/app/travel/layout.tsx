import { Suspense } from "react";
import Sidebar from "./(components)/sidebar";
import classes from "./index.module.css";
import { FirebaseAuth } from "./(components)/firebase-auth";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <Suspense fallback={<div style={{ color: "white" }}>Loading...</div>}>
      <FirebaseAuth>
        <div className={classes.Container}>
          <div className={classes.Sidebar}>
            <Sidebar />
          </div>
          <div className={classes.Chat}>{children}</div>
        </div>
      </FirebaseAuth>
    </Suspense>
  );
}

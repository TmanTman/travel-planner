import Messages from "./(components)/messages";
import { Suspense } from "react";

interface Props {
  params: {
    topicId: string;
  };
}

export default function Page({ params: { topicId } }: Props) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Messages topicId={topicId} />
    </Suspense>
  );
}

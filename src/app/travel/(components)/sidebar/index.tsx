import { currentUser } from "@clerk/nextjs";
import { fetchTopics } from "./actions";
import { SidebarLinks } from "../sidebar-links";

export default async function Sidebar() {
  const user = await currentUser();
  const topics = await fetchTopics(user!.id);

  return <SidebarLinks topics={topics} />;
}

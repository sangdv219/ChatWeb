import Sidebar from "../(site)/components/Sidebar/Sidebar";
import getConversations from "../actions/getConversation";
import ConversationList from "./Components/ConversationList";
// Test github Trung
// Test github Trung123
export default async function ConversationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const conversations = await getConversations();
  return (
    <Sidebar>
      <div className="h-full">
        <ConversationList initialItems={conversations} />
        {children}
      </div>
    </Sidebar>
  );
}

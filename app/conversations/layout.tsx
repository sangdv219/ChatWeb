import Sidebar from "../(site)/components/Sidebar/Sidebar";
import getConversations from "../actions/getConversation";
import getUser from "../actions/getUsers";
import ConversationList from "./Components/ConversationList";

export default async function ConversationLayout({children}:{children:React.ReactNode}){
    const conversations = await getConversations();
    const users = await getUser();

    return(
        <Sidebar>
            <div className="h-full">
                <ConversationList users={users} initialItems={conversations}/>
                {children}
            </div>
        </Sidebar>
    )   
}
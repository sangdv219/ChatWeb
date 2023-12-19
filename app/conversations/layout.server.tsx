import Sidebar from "../(site)/components/sidebar/Sidebar.server";
import getConversations from "../actions/getConversation";
import getUser from "../actions/getUsers";
import ConversationList from "./Components/ConversationList.client";
// chú thích mới đẩy code vào github của Sáng

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

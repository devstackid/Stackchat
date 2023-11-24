import getConversations from "../actions/getConversations"
import getUser from "../actions/getUsers"
import Sidebar from "../components/sidebar/Sidebar"
import ConversationList from "./components/ConversationList"

export default async function ConversationLayout({
    children
}: {
    children: React.ReactNode
}) {
    const conversation = await getConversations()
    const users = await getUser()
    
    return (
        <Sidebar>
            <div className="h-full">
                <ConversationList 
                    users={users}
                    initialItems={conversation}
                />
                {children}
            </div>
        </Sidebar>
    )
}

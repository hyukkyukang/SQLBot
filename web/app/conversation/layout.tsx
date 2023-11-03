import ConversationalSideBar from "@/app/conversation/sidebar";
import { ChatContextProvider } from "@/context/chatContext";
import { SidebarOpenContextContextProvider } from "./sideBarContext";

export default function SignUpLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarOpenContextContextProvider>
            <ConversationalSideBar>
                <ChatContextProvider>{children}</ChatContextProvider>
            </ConversationalSideBar>
        </SidebarOpenContextContextProvider>
    );
}

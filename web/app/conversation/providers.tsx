import { ChatContextProvider } from "@/context/chatContext";
import { QueryResultContextProvider } from "@/context/queryResultContext";
import { SchemaModalContextContextProvider } from "@/context/schemaModalContext";
import { SidebarOpenContextContextProvider } from "@/context/sideBarContext";
import { DatabaseContextProvider } from "@/context/databaseContext";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ChatContextProvider>
            <QueryResultContextProvider>
                <SidebarOpenContextContextProvider>
                    <SchemaModalContextContextProvider>
                        <DatabaseContextProvider>
                            {children}
                        </DatabaseContextProvider>
                    </SchemaModalContextContextProvider>
                </SidebarOpenContextContextProvider>
            </QueryResultContextProvider>
        </ChatContextProvider>
    );
}

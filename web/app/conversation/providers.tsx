import { ChatContextProvider } from "@/context/chatContext";
import { QueryResultContextProvider } from "@/context/queryResultContext";
import { SchemaModalContextContextProvider } from "@/context/schemaModalContext";
import { SidebarOpenContextContextProvider } from "@/context/sideBarContext";
import { DatabaseContextProvider } from "@/context/databaseContext";
import { KnobSidebarOpenContextContextProvider } from "@/context/knobSideBarContext";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ChatContextProvider>
            <QueryResultContextProvider>
                <SidebarOpenContextContextProvider>
                    <KnobSidebarOpenContextContextProvider>
                            <SchemaModalContextContextProvider>
                                <DatabaseContextProvider>
                                    {children}
                                </DatabaseContextProvider>
                            </SchemaModalContextContextProvider>
                        </KnobSidebarOpenContextContextProvider>
                </SidebarOpenContextContextProvider>
            </QueryResultContextProvider>
        </ChatContextProvider>
    );
}

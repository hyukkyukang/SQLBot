import { ChatContextProvider } from "@/context/chatContext";
import { QueryResultContextProvider } from "@/context/queryResultContext";
import { SchemaModalContextContextProvider } from "@/context/schemaModalContext";
import { SidebarOpenContextContextProvider } from "@/context/sideBarContext";
import { DatabaseContextProvider } from "@/context/databaseContext";
import { KnobSidebarOpenContextContextProvider } from "@/context/knobSideBarContext";
import { WorkloadContextProvider } from "@/context/workloadModalContext";
import { QuestionSqlProvider } from "@/context/questionSqlContext";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ChatContextProvider>
            <QueryResultContextProvider>
                <SidebarOpenContextContextProvider>
                    <KnobSidebarOpenContextContextProvider>
                        <QuestionSqlProvider>
                            <WorkloadContextProvider>
                                <SchemaModalContextContextProvider>
                                    <DatabaseContextProvider>
                                        {children}
                                    </DatabaseContextProvider>
                                </SchemaModalContextContextProvider>
                            </WorkloadContextProvider>
                        </QuestionSqlProvider>
                    </KnobSidebarOpenContextContextProvider>
                </SidebarOpenContextContextProvider>
            </QueryResultContextProvider>
        </ChatContextProvider>
    );
}

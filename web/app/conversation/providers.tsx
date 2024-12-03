import { ChatContextProvider } from "@/context/chatContext";
import { QueryResultContextProvider } from "@/context/queryResultContext";
import { SchemaModalContextContextProvider } from "@/context/schemaModalContext";
import { SidebarOpenContextContextProvider } from "@/context/sideBarContext";
import { DatabaseContextProvider } from "@/context/databaseContext";
import { KnobSidebarOpenContextContextProvider } from "@/context/knobSideBarContext";
import { WorkloadContextProvider } from "@/context/workloadModalContext";
import { QuestionSqlProvider } from "@/context/questionSqlContext";
import { TuningResultProvider } from "@/context/dbtuningContext";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ChatContextProvider>
            <QueryResultContextProvider>
                <SidebarOpenContextContextProvider>
                    <KnobSidebarOpenContextContextProvider>
                        <TuningResultProvider>
                            <QuestionSqlProvider>
                                <WorkloadContextProvider>
                                    <SchemaModalContextContextProvider>
                                        <DatabaseContextProvider>
                                            {children}
                                        </DatabaseContextProvider>
                                    </SchemaModalContextContextProvider>
                                </WorkloadContextProvider>
                            </QuestionSqlProvider>
                        </TuningResultProvider>
                    </KnobSidebarOpenContextContextProvider>
                </SidebarOpenContextContextProvider>
            </QueryResultContextProvider>
        </ChatContextProvider>
    );
}

import { Providers } from "@/app/conversation/providers";
import SchemaGraphModal from "@/app/conversation/schemaGraphModal";
import ConversationalSideBar from "@/app/conversation/sidebar";
import ConversationalKnobSideBar from "@/app/conversation/knobSidebar";

export default function SignUpLayout({ children }: { children: React.ReactNode }) {
    return (
        <Providers>
            <ConversationalSideBar>
                <ConversationalKnobSideBar>
                    <SchemaGraphModal>
                        <main className="py-12">
                            {children}
                        </main>
                    </SchemaGraphModal>
                </ConversationalKnobSideBar>
            </ConversationalSideBar>
        </Providers>
    );
}

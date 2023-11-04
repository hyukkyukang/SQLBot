import { Providers } from "@/app/conversation/providers";
import SchemaGraphModal from "@/app/conversation/schemaGraphModal";
import ConversationalSideBar from "@/app/conversation/sidebar";

export default function SignUpLayout({ children }: { children: React.ReactNode }) {
    return (
        <Providers>
            <ConversationalSideBar>
                <SchemaGraphModal>
                    {children}
                </SchemaGraphModal>
            </ConversationalSideBar>
        </Providers>
    );
}

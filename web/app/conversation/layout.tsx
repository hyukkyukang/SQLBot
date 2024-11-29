import { Providers } from "@/app/conversation/providers";
import SchemaGraphModal from "@/app/conversation/schemaGraphModal";
import ConversationalSideBar from "@/app/conversation/sidebar";

export default function SignUpLayout({ children }: { children: React.ReactNode }) {
    return (
        <Providers>
            <ConversationalSideBar>
                <SchemaGraphModal>
                    <main className="py-12">
                        {children}
                    </main>
                </SchemaGraphModal>
            </ConversationalSideBar>
        </Providers>
    );
}

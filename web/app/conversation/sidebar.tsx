"use client";
import { useDatabaseContext } from "@/context/databaseContext";
import ListBox from "@/ui/listbox/listbox";
import SideBar from "@/ui/sidebar/sidebar";

export default function ConversationalSideBar({ children }: { children: React.ReactNode }) {
    const { selectedDB, setSelectedDB } = useDatabaseContext();
    return (
        <div className="flex flex-row h-screen">
            <SideBar title={"List of Database"}>
                <ListBox itemList={["car", "Student", "Basketball"]} selectedKey={selectedDB} setSelectedKey={setSelectedDB} />
            </SideBar>
            <div className="flex flex-col w-full">{children}</div>
        </div>
    );
}

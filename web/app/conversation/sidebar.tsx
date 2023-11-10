"use client";
import { useDatabaseContext } from "@/context/databaseContext";
import { useSidebarOpenContext } from "@/context/sideBarContext";
import ListBox from "@/ui/listbox/listbox";
import SideBar from "@/ui/sidebar/sidebar";

export default function ConversationalSideBar({ children }: { children: React.ReactNode }) {
    const { isSidebarOpen, setIsSidebarOpen } = useSidebarOpenContext();
    const { selectedDB, setSelectedDB } = useDatabaseContext();
    
    return (
        <div className="flex flex-row h-screen">
            <SideBar title={"List of Database"} isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen}>
                <ListBox itemList={["test_db", "concert_singer", "dorm_1"]} selectedItem={selectedDB} setSelectedItem={setSelectedDB} />
            </SideBar>
            <div className="flex flex-col w-full">{children}</div>
        </div>
    );
}

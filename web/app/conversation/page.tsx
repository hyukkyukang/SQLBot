"use client";
import ChatWindow from "@/app/conversation/chatWindow";
import ResultWindow from "@/app/conversation/resultWindow";
import { useSchemaModalContext } from "@/context/schemaModalContext";
import { useSidebarOpenContext } from "@/context/sideBarContext";
import { Button } from "@chakra-ui/react";
import { Divider } from "@nextui-org/react";

export default function Conversation() {
    const { setIsSidebarOpen } = useSidebarOpenContext();
    const { setIsSchemaGraphOpen } = useSchemaModalContext();
    
    return (
        <div className="">
            <Button className="mx-2" onClick={() => setIsSidebarOpen(true)}>
                Select DB
            </Button>
            <Button className="mx-2" onClick={() => setIsSchemaGraphOpen(true)}>
                Show schema
            </Button>
            <div className="p-10 shadow-xl">
                <ResultWindow />
            </div>
            <Divider />
            <div className="shadow-xl my-5">
                <ChatWindow />
            </div>
        </div>
    );
}

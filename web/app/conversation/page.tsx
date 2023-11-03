"use client";
import ChatWindow from "@/app/conversation/chatWindow";
import ResultWindow from "@/app/conversation/resultWindow";
import { useSidebarOpenContext } from "@/app/conversation/sideBarContext";
import { Button } from "@chakra-ui/react";
import { Divider } from "@nextui-org/react";
import React from "react";

export default function Conversation() {
    const { setIsOpen } = useSidebarOpenContext();
    return (
        <div className="">
            <Button className="mx-2" onClick={() => setIsOpen(true)}>
                Select DB
            </Button>
            <Button className="mx-2" onClick={() => setIsOpen(true)}>
                View Schema
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

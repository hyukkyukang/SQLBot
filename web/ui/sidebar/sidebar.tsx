"use client";
import { useSidebarOpenContext } from "@/app/conversation/sideBarContext";
import { Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, SlideDirection } from "@chakra-ui/react";
import React from "react";

export default function SideBar({ title, children }: { title: string; children: React.ReactNode }) {
    const { isOpen, setIsOpen } = useSidebarOpenContext();

    return (
        <React.Fragment>
            <Drawer placement={"left" as SlideDirection} onClose={() => setIsOpen(false)} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader borderBottomWidth="1px">{title}</DrawerHeader>
                    <DrawerBody>{children}</DrawerBody>
                </DrawerContent>
            </Drawer>
        </React.Fragment>
    );
}

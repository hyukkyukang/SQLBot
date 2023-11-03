"use client";
import React from "react";

export type sidebarOpenContext = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SidebarOpenConext = React.createContext<sidebarOpenContext>({} as sidebarOpenContext);

export function SidebarOpenContextContextProvider({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = React.useState<boolean>(false);
    return (
        <SidebarOpenConext.Provider
            value={{
                isOpen,
                setIsOpen,
            }}
        >
            {children}
        </SidebarOpenConext.Provider>
    );
}

export function useSidebarOpenContext() {
    const context = React.useContext(SidebarOpenConext);
    if (context === undefined) {
        throw new Error("useSidebarOpenContext must be used within a SidebarOpenContextContextProvider");
    }
    return context;
}

"use client";
import React from "react";
import { Listbox, ListboxItem } from "@nextui-org/react";

export const ListboxWrapper = ({ children }: { children: React.ReactNode }) => (
    <div className="w-[260px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">{children}</div>
);

export default function ListBox({
    itemList: itemList,
    selectedKey,
    setSelectedKey,
}: {
    itemList: string[];
    selectedKey: string;
    setSelectedKey: React.Dispatch<React.SetStateAction<string>>;
}) {
    // const [selectedKey, setSelectedKey] = React.useState<string>("text");

    return (
        <div className="flex flex-col gap-2">
            <ListboxWrapper>
                <Listbox
                    aria-label="Single selection example"
                    variant="flat"
                    disallowEmptySelection
                    selectionMode="single"
                    selectedKeys={selectedKey}
                    onSelectionChange={(key) => setSelectedKey(key as string)}
                >
                    {itemList.map((item) => (
                        <ListboxItem key={item} value={item}>
                            {item}
                        </ListboxItem>
                    ))}
                </Listbox>
            </ListboxWrapper>
            <p className="text-small text-default-500">Selected value: {selectedKey}</p>
        </div>
    );
}

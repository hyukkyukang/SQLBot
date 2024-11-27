"use client";
import { useKnobSidebarOpenContext } from "@/context/knobSideBarContext";
import SideBar from "@/ui/sidebar/sidebar";
import { ALL_KNOB_INFO } from "@/lib/database/types";

export default function ConversationalKnobSideBar({ children }: { children: React.ReactNode }) {
    const { isKnobSidebarOpen, setIsKnobSidebarOpen } = useKnobSidebarOpenContext();

    return (
        <div className="flex flex-row h-screen">
            <SideBar title={"Knob Information"} isOpen={isKnobSidebarOpen} setIsOpen={setIsKnobSidebarOpen}>
                <div className="overflow-x-auto">
                    <table className="table-auto w-full border-collapse border border-gray-300">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 px-4 py-2">Knob Name</th>
                                <th className="border border-gray-300 px-4 py-2">Default Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(ALL_KNOB_INFO).map(([knobName, defaultValue]) => (
                                <tr key={knobName}>
                                    <td className="border border-gray-300 px-4 py-2">{knobName}</td>
                                    <td className="border border-gray-300 px-4 py-2">{defaultValue}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </SideBar>
            <div className="flex flex-col w-full">{children}</div>
        </div>
    );
}

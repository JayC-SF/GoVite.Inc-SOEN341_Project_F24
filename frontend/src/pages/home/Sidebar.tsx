import React from "react";
import { AccountToggle } from "./AccountToggle";
import { SidebarOptions } from "./SidebarOptions";

export const Sidebar = () =>{
    return (
        <div>
            <div>
                {/* TODO: Main Sidebar content */}
                <div className="overflow-y-scroll sticky top-4 h-[calc(100vh-32px-48px)]">
                    <AccountToggle></AccountToggle>
                    <SidebarOptions/>

                </div>

            </div>
            <div>
                {/* TODO: Plan toggle  */}
            </div>
            
        </div>
    );
};
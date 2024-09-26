import React from "react";
import { AccountToggle } from "./AccountToggle";

export const Sidebar = () =>{
    return (
        <div>
            <div>
                {/* TODO: Main Sidebar content */}
                <div className="overflow-y-scroll sticky top-4 h-[calc(100vh-32px-48px)]">
                    <AccountToggle></AccountToggle>

                </div>

            </div>
            <div>
                {/* TODO: Plan toggle  */}
            </div>
            
        </div>
    );
};
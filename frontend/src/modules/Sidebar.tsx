import { SidebarLogo } from "../components/SidebarLogo";
import { AccountToggle } from "./AccountToggle";
import { SidebarOptions } from "./SidebarOptions";

export const Sidebar = () =>{
    return (
        <div>
            <div>
                {/* TODO: Main Sidebar content */}
                <div className="overflow-y-scroll flex flex-col">
                    <SidebarLogo />
                    <hr/>
                    <SidebarOptions/>
                    <AccountToggle/>

                </div>

            </div>
            <div>
                {/* TODO: Plan toggle  */}
            </div>
            
        </div>
    );
};
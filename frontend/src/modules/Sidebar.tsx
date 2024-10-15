import { SidebarLogo } from "../components/SidebarLogo";
import { AccountToggle } from "./AccountToggle";
import { SidebarOptions } from "./SidebarOptions";

export const Sidebar = () => {
  return (
    <div className="flex justify-between flex-col h-full px-2 pt-2 ">
      {/* TODO: Main Sidebar content */}
      <div className="overflow-y-scroll flex flex-col">
        <SidebarLogo />
        <hr />
        <SidebarOptions />

      </div>
      <AccountToggle />
        {/* TODO: Plan toggle  */}
    </div>

  );
};
import { SidebarLogo } from "../components/SidebarLogo";
import { AccountToggle } from "./AccountToggle";
import { SidebarOptions } from "./SidebarOptions";

export const Sidebar = () => {
  return (
    <div className="flex justify-between flex-col h-full px-2 pt-2 ">
      {/* TODO: Main Sidebar content */}
      <div className="flex flex-col">
        <SidebarLogo />
        <hr className=" h-[3px] my-1 border-0 rounded bg-[#BE5A6C]"/>
        <SidebarOptions />

      </div>
      <AccountToggle />
        {/* TODO: Plan toggle  */}
    </div>

  );
};
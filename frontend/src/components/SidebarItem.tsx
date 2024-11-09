import React from "react";
import { ReactNode } from "react"

interface SidebarItemProps {
    children?: ReactNode
    onClick?: React.MouseEventHandler<HTMLDivElement>
}
export const SidebarItem = ({ children, onClick }: SidebarItemProps) => {
    const childrenArr = React.Children.toArray(children) || [];
    const icon = childrenArr.length ? childrenArr[0] : undefined
    const rest = childrenArr.length ? childrenArr.slice(1) : []
    return (
        <div role="button"
            onClick={onClick}
            className="flex items-center w-full p-3 leading-tight transition-all duration-300 transform rounded-lg outline-none hover:scale-105 hover:shadow-lg hover:bg-rose-900 hover:bg-opacity-80 focus:bg-blue-gray-50 focus:bg-opacity-80 active:bg-blue-gray-50 active:bg-opacity-80">
            <div className="grid mr-4 place-items-center">
                {icon}
            </div>
            <div className="text-gray-200">
            {rest.map((item) => item)}
            </div>
        </div>
    )
}
import { SidebarItem } from "../components/SidebarItem"
import { postLogout } from "../network/services/authService"



export const SidebarOptions = () => {
    const onClickLogout = () => postLogout().catch(console.error)
    return (
        <div>
            <nav className="flex min-w-[200] flex-col gap-1 p-2 font-sans text-base font-normal !text-white bg-transparent">
                <a href="/main">
                    <SidebarItem>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
                            className="w-5 h-5">
                            <path fillRule="evenodd"
                                d="M2.25 2.25a.75.75 0 000 1.5H3v10.5a3 3 0 003 3h1.21l-1.172 3.513a.75.75 0 001.424.474l.329-.987h8.418l.33.987a.75.75 0 001.422-.474l-1.17-3.513H18a3 3 0 003-3V3.75h.75a.75.75 0 000-1.5H2.25zm6.04 16.5l.5-1.5h6.42l.5 1.5H8.29zm7.46-12a.75.75 0 00-1.5 0v6a.75.75 0 001.5 0v-6zm-3 2.25a.75.75 0 00-1.5 0v3.75a.75.75 0 001.5 0V9zm-3 2.25a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5z"
                                clipRule="evenodd"></path>
                        </svg>
                        Home
                    </SidebarItem >
                </a>
                
                <SidebarItem >
                    <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.20801 15.0209L10.7497 19.2917L19.2913 15.0209M2.20801 10.75L10.7497 15.0209L19.2913 10.75M10.7497 2.20837L2.20801 6.47921L10.7497 10.75L19.2913 6.47921L10.7497 2.20837Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Classes
                </SidebarItem>
                <SidebarItem>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
                        className="w-5 h-5">
                        <path fillRule="evenodd"
                            d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.923-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z"
                            clipRule="evenodd"></path>
                    </svg>
                    Groups
                </SidebarItem>
                <SidebarItem>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
                        className="w-5 h-5">
                        <path fillRule="evenodd"
                             d="M12 1.75a10.25 10.25 0 110 20.5A10.25 10.25 0 0112 1.75zm0 1.5a8.75 8.75 0 100 17.5 8.75 8.75 0 000-17.5zm.75 3.5a.75.75 0 00-1.5 0v5.25H7a.75.75 0 000 1.5h5.25v4.5a.75.75 0 001.5 0v-4.5H17a.75.75 0 000-1.5h-4.5V6.75z"
                             clipRule="evenodd"></path>
                     </svg>
                    Assessment
                </SidebarItem>
                <SidebarItem onClick={onClickLogout}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
                        className="w-5 h-5">
                        <path fillRule="evenodd"
                            d="M12 2.25a.75.75 0 01.75.75v9a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM6.166 5.106a.75.75 0 010 1.06 8.25 8.25 0 1011.668 0 .75.75 0 111.06-1.06c3.808 3.807 3.808 9.98 0 13.788-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788a.75.75 0 011.06 0z"
                            clipRule="evenodd"></path>
                    </svg>
                    Log Out
                </SidebarItem>
            </nav>
        </div>
    )
}

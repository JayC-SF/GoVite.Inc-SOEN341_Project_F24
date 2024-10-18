import { createContext } from "react";
export interface UserInfo {
    email: string
    firstname: string
    lastname: string
    role: string
}

const UserInfoContext = createContext<UserInfo | undefined>(undefined)

export default UserInfoContext
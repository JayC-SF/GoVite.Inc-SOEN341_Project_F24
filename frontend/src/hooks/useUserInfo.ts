import { useEffect, useState } from "react";
import { GetUserInfo } from "../network/services/commonService";
import { UserInfo } from "../contexts/userinfo";

/**
 * User info hook that queries the user's information upon the first rendering 
 */
export function useUserInfo() {
    const [userInfo, setUserInfo] = useState<UserInfo>()
    useEffect(() => {
        GetUserInfo().then(setUserInfo)
    }, [])
    return userInfo
}
import { UserInfo } from "../../contexts/userinfo";
import { handleUnauthorizedError } from "../http/errorHandler";
import { JsonRequest } from "../http/jsonRequest";
import { UsersRoutes } from "../routes";


export const GetUserInfo = (email?: string) =>
    // typecast json request to a promise of user info
    <Promise<UserInfo>>
    JsonRequest(UsersRoutes.userinfo, email? {params:{email}} : undefined)
    // if unauthorized, reroute user to login page
    .catch(handleUnauthorizedError)
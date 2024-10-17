import { UserInfo } from "../../contexts/userinfo";
import { handleUnauthorizedError } from "../http/errorHandler";
import { JsonRequest } from "../http/jsonRequest";
import { assertType } from "../http/thenHandler";
import { UsersRoutes } from "../routes";


export const GetUserInfo = () =>
    JsonRequest(UsersRoutes.userinfo)
        .catch(handleUnauthorizedError)
        .then(assertType<UserInfo>)
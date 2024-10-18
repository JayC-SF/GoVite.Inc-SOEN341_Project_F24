import { HttpStatus } from "../http/common";
import { handleUnauthorizedError } from "../http/errorHandler";
import { JsonRequest } from "../http/jsonRequest";
import { AuthRoutes } from "../routes";

// function determining if the user is logged in or not
export const postIsLoggedIn = () => (
    JsonRequest(AuthRoutes.isLoggedIn)
        // return true for successful request
        .then(() => true)
        .catch((res) => {
            // check if user is logged in
            if (res.status === HttpStatus.Unauthorized) {
                return false
            }
            // api call failed due to uknown reason, let caller handle the error
            throw res
        })
)

// post request to logout a user. The user will be redirected to login if unauthenticated
export const postLogout = () =>
    JsonRequest(AuthRoutes.logout, { method: "POST" })
        .then(() => { window.location.href = "/login" })
        .catch(handleUnauthorizedError)

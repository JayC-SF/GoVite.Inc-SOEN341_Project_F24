
// this error handler function will redirect the user if the user is not logged in and 

import { HttpStatus } from "./common";

// This function handles unauthorized api calls for the program
export function handleUnauthorizedError(res: Response) {
    if (res.status === HttpStatus.Unauthorized) {
        window.location.href ="/login"
    }
    // can't handle this err, throw the response again let caller handle that one
    throw res
}
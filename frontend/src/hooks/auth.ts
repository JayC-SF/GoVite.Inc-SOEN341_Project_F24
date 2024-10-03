import { useEffect, useState } from "react";
import { JsonRequest } from "../network/http";
import { AuthRoutes } from "../network/routes";

/**
 * Require authentication hook. The hook returns a boolean stating whether the page should be rendered or not 
 */
export function redirectToLoginIfLoggedOut(): boolean {
    // network api to test if logged in
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
    useEffect(
        // check if user is authenticated, if so, render page content otherwise, set render page content to false
        () => (JsonRequest(AuthRoutes.authStatus).then(() => setIsLoggedIn(true)), undefined),
        [])
    return isLoggedIn
}

export function redirectToMainIfLoggedIn() {
    // network api to test if logged in
    const [isLoggedOut, setIsLoggedOut] = useState<boolean>(false)
    useEffect(
        // check if user is authenticated, if so, render page content otherwise, set render page content to false
        () => {
            JsonRequest(AuthRoutes.authStatus, { requireLoggedIn: false })
                .then(
                    () => window.location.href = "/main",
                    () => setIsLoggedOut(true)
                )
        },
        [])
    return isLoggedOut
}

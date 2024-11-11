import { useEffect, useState } from "react";
import { postIsLoggedIn } from "../network/services/authService";


/**
 * Require authentication hook. The hook returns a boolean stating whether the page should be rendered or not 
 */
export function useRequireAuthenticated(): boolean {
    // network api to test if logged in
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
    useEffect(
        // check if user is authenticated, if so, render page content otherwise, set render page content to false
        () => {
            postIsLoggedIn().then((loggedin) => {
                if (!loggedin) {
                    window.location.href = "/login"
                }
                setIsLoggedIn(loggedin)
            })
        },
        [])
    return isLoggedIn
}

export function useRequireUnauthenticated() {
    // network api to test if logged in
    const [isLoggedOut, setIsLoggedOut] = useState<boolean>(false)
    useEffect(
        // check if user is authenticated, if so, render page content otherwise, set render page content to false
        () => {
            postIsLoggedIn().then(loggedin => {
                if (loggedin) {
                    window.location.href ="/main"
                }
                setIsLoggedOut(!loggedin)
            })
        },
        [])
    return isLoggedOut
}
export type Json = string | number | boolean | null | Json[] | { [key: string]: Json };

const objectToRecord = (params: object): Record<string, string> => (
    Object.entries(params).reduce((acc, [key, value]) => {
        acc[key] = String(value)
        return acc
    }, {} as Record<string, string>)
)

export const addUrlParams = (url: string, params: Record<string, any> | undefined) => (
    // if params are defined, add it to url
    params ? url + "?" + new URLSearchParams(objectToRecord(params)).toString() : url
)


export interface JsonRequestInit extends Omit<RequestInit, 'body'> {
    body?: Json,
    params?: Record<string, any>
    requireLoggedIn?: boolean
};

export async function JsonRequest(url: string, options: JsonRequestInit = {}) {

    // if params are defined, add it to url
    url = addUrlParams(url, options.params)
    options.requireLoggedIn = options.requireLoggedIn ?? true
    let response = await fetch(url, {
        ...options,
        body: JSON.stringify(options.body)
    })

    if (!response.ok) {
        switch (response.status) {
            case HttpStatus.Unauthorized:
                if (options.requireLoggedIn) window.location.href = "/login"
                throw { status: response.status, message: await response.text() }
            default:
                throw { status: response.status, message: await response.text() }
        }
    }

    const contentLength = response.headers.get("Content-Length")
    // Check if Content-Length is present and greater than zero
    if (contentLength && parseInt(contentLength) > 0) {
        // If Content-Length is greater than 0, read the body as JSON
        return await response.json() as Json
    }
    // Fallback: Read the response body as text
    const text = await response.text()
    if (text.length > 0) {
        // If text is not empty, parse it as JSON
        return JSON.parse(text) as Json
    }
    // no body in the response, let caller handle the data
    return null

}

export enum HttpStatus {
    OK = 200,
    Created = 201,
    Accepted = 202,
    NoContent = 204,
    BadRequest = 400,
    Unauthorized = 401,
    Forbidden = 403,
    NotFound = 404,
    InternalServerError = 500,
    NotImplemented = 501,
    BadGateway = 502,
    ServiceUnavailable = 503,
}

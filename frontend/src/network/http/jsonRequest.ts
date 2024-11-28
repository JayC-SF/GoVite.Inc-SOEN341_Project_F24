import { addUrlParams } from "./common"

export interface JsonRequestInit extends Omit<RequestInit, 'body'> {
    // body of the request as a JSON object
    body?: any,
    // params field to handle url params of the url
    params?: Record<string, any>
    // same type as RequestInit, except we omit the Content-Type since it has to be JSON
    headers?: Omit<RequestInit['headers'], 'Content-Type'>
};

// Performs api request using JSON as body and adds params in options
export async function JsonRequest(url: string, options: JsonRequestInit = {}) {
    // if params are defined, add it to url
    url = addUrlParams(url, options.params)
    const response = await fetch(url, {
        headers: {
            ...options.headers,
            "Content-Type": "application/json"
        },
        ...options,
        body: JSON.stringify(options.body)
    })

    if (!response.ok) {
        // let caller handle the response
        throw response
    }

    // response is ok convert response to json object
    const contentLength = response.headers.get("Content-Length")
    // Check if Content-Length is present and greater than zero
    if (contentLength && parseInt(contentLength) > 0) {
        // If Content-Length is greater than 0, read the body as JSON
        return await response.json()
    }
    // Fallback: Read the response body as text
    const text = await response.text()
    if (text.length > 0) {
        // If text is not empty, parse it as JSON
        return JSON.parse(text)
    }
    // no body in the response, let caller handle the data
    return null
}
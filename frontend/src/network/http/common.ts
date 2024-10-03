export type Json = string | number | boolean | null | Json[] | { [key: string]: Json };

// util function for converting objects to url params records
const objectToRecord = (params: object): Record<string, string> => (
    Object.entries(params).reduce((acc, [key, value]) => {
        acc[key] = String(value)
        return acc
    }, {} as Record<string, string>)
)

// util function for creating url params
export const addUrlParams = (url: string, params: Record<string, any> | undefined) => (
    // if params are defined, add it to url
    params ? url + "?" + new URLSearchParams(objectToRecord(params)).toString() : url
)

// List of useful Http status codes 
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
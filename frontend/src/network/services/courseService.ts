import { handleUnauthorizedError } from "../http/errorHandler"
import { JsonRequest } from "../http/jsonRequest"
import { CourseRoutes } from "../routes"

export interface Group {
    id?: string
    groupname: string
    courseid: string
}
export interface Course {
    id: string
    courseid: string
    coursecode: string
    coursename: string
    coursedescription: string
    coursecredits: number
    teacher: string
} 

export interface CourseInfoResponse {
    course : Course
    groups : Group[]
    joinedGroup? : Group
}
export const GetCourseInfo = (courseid: string) =>
    // typecast json request to a promise of course info
    <Promise<CourseInfoResponse>>
    JsonRequest(CourseRoutes.courseInfo, {params: {courseid: courseid}})
    // if unauthorized, reroute user to login page
    .catch(handleUnauthorizedError)
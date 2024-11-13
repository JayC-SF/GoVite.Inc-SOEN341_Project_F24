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

export interface RatingResponse {
    cooperation: number
    conceptual: number
    practical: number
    workethic: number
}
export interface RaterResponse {
    firstname: string
    lastname: string
    email: string
    ratings: RatingResponse
    average: number
    comment: string
}
export interface StudentResponse {
    firstname: string
    lastname: string
    email: string
    averagerating: number | null
    ratedby: RaterResponse[]
}
export interface TeamResponse {
    teamname: string
    students: StudentResponse[]
}
export interface CourseDetailsResponse {
    teams: TeamResponse[]
}

export const GetDetailedCourseInfo = (courseid: string) =>
    JsonRequest(CourseRoutes.courseDetails, {params:{courseid}})
    .catch(handleUnauthorizedError) as Promise<CourseDetailsResponse>
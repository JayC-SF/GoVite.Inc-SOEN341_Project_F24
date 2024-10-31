import { UserInfo } from "../../contexts/userinfo";
import { Json } from "../http/common";
import { handleUnauthorizedError } from "../http/errorHandler";
import { JsonRequest } from "../http/jsonRequest";
import { GroupsRoutes } from "../routes";

export const PostCreateNewGroup = (group: Json) => JsonRequest(GroupsRoutes.addgroup, {method:"POST", body: group}).catch(handleUnauthorizedError)

export interface Group{
    id: string
    groupname: string
}
export interface GroupStudentResponse extends UserInfo {
    score: number
}
export interface GroupInfoResponse {
    group: Group
    students : GroupStudentResponse[]
}
export const GetGroupInfo = (groupid: string) => (
    <Promise<GroupInfoResponse>>
    // typecast json request to a promise of course info
    JsonRequest(GroupsRoutes.groupInfo, {params: {groupid}})
    // if unauthorized, reroute user to login page
    .catch(handleUnauthorizedError)
)
export const GetStudentsWithoutGroup = (groupid: string) => (
    <Promise<UserInfo[]>>
    // typecast json request to a promise of course info
    JsonRequest(GroupsRoutes.studentsWithoutGroup, {params: {groupid}})
    // if unauthorized, reroute user to login page
    .catch(handleUnauthorizedError)
)

export interface UserGroupBody {
    groupid: string
    email: string
}
export const PostNewStudentInGroup = (userGroup: UserGroupBody) => (
    <Promise<void>>
    // typecast json request to a promise of course info
    JsonRequest(GroupsRoutes.newstudentingroup, {method:"POST", body: userGroup})
    // if unauthorized, reroute user to login page
    .catch(handleUnauthorizedError)
)
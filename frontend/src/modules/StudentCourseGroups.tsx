import { CourseInfoResponse } from "../network/services/courseService"

export interface StudentCourseGroupsProps{
    courseInfo?: CourseInfoResponse
}
export function StudentCourseGroups(props: StudentCourseGroupsProps) {
    // render nothing if no courseinfo in props for the moment
    if (props.courseInfo == undefined)return <></>
    return <div>
        <h2 className="text-3xl">
            My Group
        </h2>
            {props.courseInfo.joinedGroup? (
                <a href={"/groups/"+props.courseInfo.joinedGroup.id}>{props.courseInfo.joinedGroup.groupname}</a>
            ): "You don't belong to any groups."}
        <h2 className="text-3xl">
            Other Groups
        </h2>
        <div>
            {props.courseInfo.groups.map((g)=>(
                <p>
                    <a href={"/groups/"+g.id}>{g.groupname}</a>
                </p>
            ))}
        </div>
    </div>
}
import { CourseInfoResponse } from "../network/services/courseService"

export interface StudentCourseGroupsProps{
    courseInfo?: CourseInfoResponse
}
export function StudentCourseGroups(props: StudentCourseGroupsProps) {
    // render nothing if no courseinfo in props for the moment
    if (props.courseInfo == undefined)return <></>
    return <div className="m-5">
        <h2 className="text-3xl mb-2 mt-5 font-bold">
            My Group
        </h2>
        <div className="font-semibold m-5">
        {props.courseInfo.joinedGroup? (
                <a href={"/groups/"+props.courseInfo.joinedGroup.id}>{props.courseInfo.joinedGroup.groupname}</a>
            ): "You don't belong to any groups."}

        </div>
            
        <h2 className="text-3xl mt-5 font-bold">
            Other Groups
        </h2>
        <div className="mx-5">
            
            {props.courseInfo.groups.map((g)=>(
                <div>
                    <p>
                        <span className="pt-3 font-semibold flex items-center">
                            <span className="pr-3">
                            <svg
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                height="1em"
                                width="1em"
                                {...props}
                                >
                                <path d="M16.604 11.048a5.67 5.67 0 00.751-3.44c-.179-1.784-1.175-3.361-2.803-4.44l-1.105 1.666c1.119.742 1.8 1.799 1.918 2.974a3.693 3.693 0 01-1.072 2.986l-1.192 1.192 1.618.475C18.951 13.701 19 17.957 19 18h2c0-1.789-.956-5.285-4.396-6.952z" />
                                <path d="M9.5 12c2.206 0 4-1.794 4-4s-1.794-4-4-4-4 1.794-4 4 1.794 4 4 4zm0-6c1.103 0 2 .897 2 2s-.897 2-2 2-2-.897-2-2 .897-2 2-2zm1.5 7H8c-3.309 0-6 2.691-6 6v1h2v-1c0-2.206 1.794-4 4-4h3c2.206 0 4 1.794 4 4v1h2v-1c0-3.309-2.691-6-6-6z" />
                            </svg>
                            </span>
                            <a href={"/groups/"+g.id}>{g.groupname}</a>
                        </span>

                    </p>
                </div>
                
            ))}
        </div>
    </div>
}
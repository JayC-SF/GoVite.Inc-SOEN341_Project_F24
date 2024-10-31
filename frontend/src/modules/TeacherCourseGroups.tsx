import { useState } from "react";
import { CourseInfoResponse, Group } from "../network/services/courseService";
import { JsonRequest } from "../network/http/jsonRequest";
import { PostCreateNewGroup } from "../network/services/groupsService";

export interface TeacherCourseGroupsProps {
  courseInfo?: CourseInfoResponse;
  refreshGroups(): void;
}

export function TeacherCourseGroups(props: TeacherCourseGroupsProps) {
  const [newGroupName, setNewGroupName] = useState<string | undefined>();
  if (props.courseInfo == undefined) {
    return <></>;
  }

  const onSaveNewGroup = async () => {
    setNewGroupName(undefined)

    // Makes POST Request to Create new group using group name & course information
    await PostCreateNewGroup({ groupname: newGroupName || "", courseid: props.courseInfo?.course.courseid || "" })

    props.refreshGroups()

  }

  return (
    <div>
      <h2 className="text-3xl mt-5">Groups</h2>
      <div>
        {props.courseInfo.groups.map((g) => (
          <p className="m-3 flex items-center">
            <svg className="mr-3"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                height="1em"
                                width="1em"
                                {...props}
                                >
                                <path d="M16.604 11.048a5.67 5.67 0 00.751-3.44c-.179-1.784-1.175-3.361-2.803-4.44l-1.105 1.666c1.119.742 1.8 1.799 1.918 2.974a3.693 3.693 0 01-1.072 2.986l-1.192 1.192 1.618.475C18.951 13.701 19 17.957 19 18h2c0-1.789-.956-5.285-4.396-6.952z" />
                                <path d="M9.5 12c2.206 0 4-1.794 4-4s-1.794-4-4-4-4 1.794-4 4 1.794 4 4 4zm0-6c1.103 0 2 .897 2 2s-.897 2-2 2-2-.897-2-2 .897-2 2-2zm1.5 7H8c-3.309 0-6 2.691-6 6v1h2v-1c0-2.206 1.794-4 4-4h3c2.206 0 4 1.794 4 4v1h2v-1c0-3.309-2.691-6-6-6z" />
                            </svg>
            <a href={"/groups/" + g.id}>{g.groupname}</a>
          </p>
        ))}
        {newGroupName != undefined && (
          <div className="flex gap-2">
            <input
              className="border border-gray-300 text-center p-1"
              onChange={(e) => setNewGroupName(e.target.value)}
              placeholder="New Group Name"
            />
            <div className="flex gap-1">
              <button
                className="bg-primary-red text-white font-bold py-2 px-4 rounded-md hover:bg-red-600 transition duration-200"
                onClick={() => setNewGroupName(undefined)}
              >
                Cancel
              </button>
              <button
                className="bg-primary-red text-white font-bold py-2 px-4 rounded-md hover:bg-red-600 transition duration-200"
                onClick={onSaveNewGroup}
              >
                Save
              </button>
            </div>
          </div>
        )}
      </div>
      <button
        className="bg-primary-red text-white font-bold py-2 px-4 rounded-md hover:bg-red-600 transition duration-200"
        onClick={() => setNewGroupName("")}
      >
        New Group
      </button>
    </div>
  );
}

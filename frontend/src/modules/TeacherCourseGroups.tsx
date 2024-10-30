import { useState } from "react";
import { CourseInfoResponse, Group } from "../network/services/courseService";

export interface TeacherCourseGroupsProps {
  courseInfo?: CourseInfoResponse;
  onAddGroup(group: Group): void;
}
export function TeacherCourseGroups(props: TeacherCourseGroupsProps) {
  const [newGroupName, setNewGroupName] = useState<string | undefined>();
  if (props.courseInfo == undefined) {
    return <></>;
  }

  const onSaveNewGroup = () => {
    setNewGroupName(undefined)
    props.onAddGroup({ groupname: newGroupName || "", courseid: props.courseInfo?.course.courseid || "" })

  }

  return (
    <div>
      <h2 className="text-3xl">Groups</h2>
      <div>
        {props.courseInfo.groups.map((g) => (
          <p>
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

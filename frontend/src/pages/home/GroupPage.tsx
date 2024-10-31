import { useParams } from "react-router-dom";
import UserInfoContext, { UserInfo } from "../../contexts/userinfo";
import SidebarPageTemplate from "../../templates/SidebarPageTemplate";
import { createRef, useEffect, useState } from "react";
import { useRequireAuthenticated } from "../../hooks/auth";
import { useUserInfo } from "../../hooks/useUserInfo";
import {
  GetGroupInfo,
  GetStudendsWithoutGroup,
  GroupInfoResponse,
  PostNewStudentInGroup,
} from "../../network/services/groupsService";
import { RMPButton } from "../../components/Button";

export default function GroupPage() {
  const { groupid } = useParams();
  const userInfo = useUserInfo();
  const displayContent = useRequireAuthenticated();
  const [groupInfo, setGroupInfo] = useState<GroupInfoResponse>();
  const [newStudents, setNewStudents] = useState<UserInfo[]>();
  const selectRef = createRef<HTMLSelectElement>();

  const onClickAddNewStudent = () => {
    PostNewStudentInGroup({
      groupid: groupid || "",
      email: selectRef.current?.value || "",
    });
    refreshStudentList();
  };

  const refreshStudentList = () => {
    GetGroupInfo(groupid || "").then(setGroupInfo);
    GetStudendsWithoutGroup(groupid || "").then(setNewStudents);
  };

  useEffect(() => {
    refreshStudentList();
  }, []);
  return (
    <UserInfoContext.Provider value={userInfo}>
      <SidebarPageTemplate hidden={!displayContent}>
        <div className="p-5">
          <h2 className="text-3xl mt-5">{groupInfo?.group.groupname}</h2>
          <h2 className="text-3xl mt-5">Students</h2>
          <div className="mb-4">
            {groupInfo?.students?.length
              ? groupInfo?.students?.map((user, idx) => (<div>
                  <span key={idx} className="m-3 flex items-center">
                    {user.firstname} {user.lastname} - {user.email}
                  </span> <RMPButton>Rate</RMPButton>
              </div>
                ))
              : "No students belong to this group."}
          </div>
          {userInfo?.role == "teacher" && newStudents && (
            <div>
              <select
                ref={selectRef}
                className="border border-gray-300 rounded-md p-2 w-96 mb-4"
              >
                {newStudents.map((s, idx) => (
                  <option value={s.email} key={idx}>
                    {s.firstname} {s.lastname}
                  </option>
                ))}
              </select>
              <RMPButton className="ml-3" onClick={onClickAddNewStudent}>
                Add student
              </RMPButton>
            </div>
          )}
        </div>
      </SidebarPageTemplate>
    </UserInfoContext.Provider>
  );
}

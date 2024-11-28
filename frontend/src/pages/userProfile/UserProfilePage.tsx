import { useParams } from "react-router-dom";
import UserInfoContext, { UserInfo } from "../../contexts/userinfo";
import { useRequireAuthenticated } from "../../hooks/auth";
import { useUserInfo } from "../../hooks/useUserInfo";
import SidebarPageTemplate from "../../templates/SidebarPageTemplate";
import { useEffect, useState } from "react";
import { GetUserInfo } from "../../network/services/commonService";
import StudentProfileIcon from "../../assets/StudentProfileIcon.svg";
import TeacherProfileIcon from "../../assets/TeacherProfileIcon.svg";

export function UserProfilePage() {
  const userInfo = useUserInfo();
  const displayContent = useRequireAuthenticated();
  const { email } = useParams();
  const [userProfile, setUserProfile] = useState<UserInfo>();
  useEffect(() => {
    GetUserInfo(email || "").then(setUserProfile);
  }, []);
  return (
    <UserInfoContext.Provider value={userInfo}>
      <SidebarPageTemplate hidden={!displayContent}>
        <div className="bg-[#9B394B] p-3 h-full">
          <div className="bg-[#FCF4F5] rounded-2xl p-6 h-full">
          <div className="rounded-t-2xl banner-user shadow-md p-4 h-1/4"></div>
            <div className="bg-white flex flex-col h-3/4 rounded-b-2xl px-28">
              <div className="flex justify-between pt-9">
                <div className="flex">
                  {userProfile?.role === "teacher" ? (
                    <img
                      src={TeacherProfileIcon}
                      className="size-20 mr-6 self-center"
                      alt="Comment Icon"
                    />
                  ) : userProfile?.role === "student" ? (
                    <img
                      src={StudentProfileIcon}
                      className="size-20 mr-6 self-center"
                      alt="Comment Icon"
                    />
                  ) : null}

                  <div>
                    <div className="flex text-3xl font-semibold pt-2">
                      {userProfile?.username}
                      <a href={"mailto:" + userProfile?.email} className="ml-3">
                        <svg
                          width="37"
                          height="38"
                          viewBox="0 0 37 38"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle
                            opacity="0.1"
                            cx="18.5"
                            cy="19.4331"
                            r="18.5"
                            fill="#4182F9"
                          />
                          <path
                            d="M22.3545 12.8809H14.6462C12.3337 12.8809 10.792 14.0371 10.792 16.735V22.1309C10.792 24.8288 12.3337 25.985 14.6462 25.985H22.3545C24.667 25.985 26.2087 24.8288 26.2087 22.1309V16.735C26.2087 14.0371 24.667 12.8809 22.3545 12.8809ZM22.7168 17.5752L20.3041 19.5023C19.7953 19.9109 19.1478 20.1113 18.5003 20.1113C17.8528 20.1113 17.1976 19.9109 16.6966 19.5023L14.2839 17.5752C14.0372 17.3748 13.9987 17.0048 14.1914 16.7582C14.3918 16.5115 14.7541 16.4652 15.0007 16.6657L17.4134 18.5927C17.9993 19.0629 18.9937 19.0629 19.5795 18.5927L21.9922 16.6657C22.2389 16.4652 22.6089 16.5038 22.8016 16.7582C23.002 17.0048 22.9634 17.3748 22.7168 17.5752Z"
                            fill="#4182F9"
                          />
                        </svg>
                      </a>
                    </div>
                    <div className="user-email">{userProfile?.email}</div>
                  </div>
                </div>
              </div>
              <div className="flex gap-10">
                <div className="mt-6 flex-1">
                  <label className="pl-2">First Name</label>
                  <div className="w-full mb-6 mt-1 bg-[#F9F9F9] opacity-50 border disabled border-gray-300 text-sm rounded-lg block p-2.5">
                    {userProfile?.firstname}
                  </div>
                  <label className="pl-2">Role</label>
                  <div className="w-full mt-1 mb-3 bg-[#F9F9F9] opacity-50 border disabled border-gray-300 text-sm rounded-lg block p-2.5">
                    {userProfile?.role}
                  </div>
                </div>

                <div className="mt-6 flex-1">
                  <label className="pl-2">Last Name</label>
                  <div className="w-full mb-6 mt-1 bg-[#F9F9F9] opacity-50 border disabled border-gray-300 text-sm rounded-lg block p-2.5">
                    {userProfile?.lastname}
                  </div>

                  <label className="pl-2">Email</label>
                  <div className="w-full mt-1 mb-3 bg-[#F9F9F9] opacity-50 border disabled border-gray-300 text-sm rounded-lg block p-2.5">
                    {userProfile?.email}
                  </div>
                </div>
              </div>
            </div>
            {/* {JSON.stringify(userProfile, null, 2)} */}
          </div>
        </div>
        {/* page content here */}
      </SidebarPageTemplate>
    </UserInfoContext.Provider>
  );
}

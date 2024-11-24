import { useContext } from "react";
import UserInfoContext, { UserInfo } from "../contexts/userinfo";

export const AccountToggle = () => {
  const userInfo = useContext<UserInfo | undefined>(UserInfoContext);

  // Set the profile icon based on user role
  const profileIconUrl = userInfo?.role === "teacher"
    ? "https://cdn-icons-png.flaticon.com/512/18181/18181129.png"  // Professor icon
    : "https://cdn-icons-png.flaticon.com/512/13972/13972628.png"; // Student icon

  // Capitalize the first letter of the role
  const capitalizeRole = (role: string | undefined) =>
    role ? role.charAt(0).toUpperCase() + role.slice(1) : "";

  return (
    <div className='mb-4 mt-2 pd-4 border-stone-300'>
      <a href={`/profile/${userInfo?.email}`} > 
        <button className='flex account py-5 hover:bg-rose-900 p-3 rounded-lg transition-colors relative gap-2 w-full items-center mb-2'>
          <img
            src={profileIconUrl}
            alt="avatar"
            className='size-8 rounded shrink-0 bg-indigo-600'
          />
          <div className='text-start'>
            <div className="text-start text-white">
              <span className="text-sm font-extrabold block ">
                {userInfo?.firstname} {userInfo?.lastname}
              </span>
              <span className="text-xs block">{capitalizeRole(userInfo?.role)}</span>
            </div>
          </div>
        </button>
      </a>
    </div>
  );
};

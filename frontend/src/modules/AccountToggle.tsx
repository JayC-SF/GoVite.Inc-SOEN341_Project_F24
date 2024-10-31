
import { useContext } from "react"
import UserInfoContext, { UserInfo } from "../contexts/userinfo"

export const AccountToggle = () => {
  const userInfo = useContext<UserInfo | undefined>(UserInfoContext)
  return (
    <div className='mb-4 mt-2 pd-4 border-stone-300'>
      <button className='flex p-0.5 hover:bg-rose-900 p-3 rounded-lg transition-colors relative gap-2 w-full items-center mb-2'>
        <img
          src="https://api.dicebear.com/9.x/big-smile/svg"
          alt="avatar"
          className='size-8 rounded shrink-0 bg-indigo-600'
        />
        <div className='text-start'>
          <div className="text-start text-white">
            <span className="text-sm font-extrabold block ">{userInfo?.firstname} {userInfo?.lastname}</span>
            <span className="text-xs block">{userInfo?.role}</span>
          </div>
        </div>
      </button>
    </div>
  )
}
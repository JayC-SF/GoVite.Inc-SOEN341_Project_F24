
export const AccountToggle = () => {
  return (
    <div className='border-b mb-4 mt-2 pd-4 border-stone-300'>
      <button className='flex p-0.5 hover:bg-stone-200 rounded transition-colors relative gap-2 w-full items-center mb-2'>
        <img
          src="https://api.dicebear.com/9.x/big-smile/svg"
          alt="avatar"
          className='size-8 rounded shrink-0 bg-indigo-600'
        />
        <div className='text-start'>
          <div className="text-start">
            <span className="text-sm font-bold block">Rate my Peers</span>
            <span className="text-xs block text-stone-500">Role</span>
          </div>
        </div>
      </button>
    </div>
  )
}

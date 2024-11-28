export function RMPButton(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) {
  const classname = props.disabled == true? "bg-gray-500 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-md transition duration-200" : 
   "bg-primary-red text-white font-bold py-2 px-4 rounded-md hover:bg-red-600 transition duration-200`"
  return (
    <button
      {...props}
      className={classname}
    >
      {props.children}
    </button>
  );
}

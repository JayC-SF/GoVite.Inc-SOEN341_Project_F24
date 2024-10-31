export function RMPButton(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) {
  return (
    <button
      {...props}
      className={`${props.className} bg-primary-red text-white font-bold py-2 px-4 rounded-md hover:bg-red-600 transition duration-200`}
    >
      {props.children}
    </button>
  );
}

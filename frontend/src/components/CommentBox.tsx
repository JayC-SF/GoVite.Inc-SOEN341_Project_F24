import { useFormHookContext } from "../hooks/useFormHook";
import { NewRatingForm } from "../network/services/ratingsService";

const CommentBox = ({ placeholder = "Add your comments here..." }) => {
  const useFormData = useFormHookContext<NewRatingForm>()
  if (!useFormData) return <></> 
  const {watch, setValue} = useFormData
  return <textarea
      className="border border-gray-300 rounded-md p-2 mt-2"
      placeholder={placeholder}
      rows={3}
      cols={80}
      value={watch("comment")}
      onChange={(e) => setValue("comment", e.target.value)}
  />
};

export default CommentBox;

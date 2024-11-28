import React, {useEffect } from "react";
import SelectRating from "../modules/SelectRating";
import { NewRatingForm } from "../network/services/ratingsService";
import { useFormHookContext } from "../hooks/useFormHook";

interface RatingQuestionProps {
  idx: number;
  criterionId: string;
  label: string;
}

const RatingQuestion: React.FC<RatingQuestionProps> = ({ idx, label, criterionId }) => {
  const useFormData = useFormHookContext<NewRatingForm>()
  const {watch,setValue} = useFormData || {watch:undefined, setValue:undefined}
  useEffect(()=>{
    setValue?.(`criteria.${idx}.criterionId`, criterionId)
  },[idx, criterionId, setValue])
  if (!useFormData) return <></> 
  const onSelectRating = (rating:number) => setValue?.(`criteria.${idx}.grade`,rating)
  return (
    <div className="flex flex-col mb-6">
      <label className="text-lg font-semibold text-gray-800">{label}</label>
      <SelectRating value={watch?.(`criteria.${idx}.grade`) || 1} onSelectRating={onSelectRating}/>
    </div>
  );
};

export default RatingQuestion;

import { handleUnauthorizedError } from "../http/errorHandler";
import { JsonRequest } from "../http/jsonRequest";
import { RatingsRoutes } from "../routes";

export interface CriterionFormItem {
  criterionId: string;
  grade: number;
}
export interface NewRatingForm {
  ratedstudent: string;
  groupid: string;
  comment: string;
  criteria: CriterionFormItem[];
}

const defaultNewRatingForm: NewRatingForm = {
  ratedstudent: "",
  groupid: "",
  comment: "",
  criteria: Array.from({length:20}, () => ({criterionId: "", grade: 1})),
} as const;

export { defaultNewRatingForm };

export const PostCreateNewRating = async (rating: NewRatingForm) => {
    await JsonRequest(RatingsRoutes.submitRating, {
      method: "POST",
      body: rating,
    }).catch(handleUnauthorizedError);
}

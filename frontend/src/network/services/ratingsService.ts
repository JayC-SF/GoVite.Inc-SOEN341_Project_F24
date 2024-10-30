import { handleUnauthorizedError } from "../http/errorHandler";
import { JsonRequest } from "../http/jsonRequest";
import { RatingsRoutes } from "../routes";

export const PostCreateNewRating = (rating: any) => JsonRequest(RatingsRoutes.submitRating, {method:"POST", body: rating}).catch(handleUnauthorizedError)
import { Json } from "../http/common";
import { handleUnauthorizedError } from "../http/errorHandler";
import { JsonRequest } from "../http/jsonRequest";
import { RatingsRoutes } from "../routes";

export const PostCreateNewRating = (rating: Json) => JsonRequest(RatingsRoutes.submitRating, {method:"POST", body: rating}).catch(handleUnauthorizedError)
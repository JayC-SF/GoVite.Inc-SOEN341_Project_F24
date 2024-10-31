import { Json } from "../http/common";
import { handleUnauthorizedError } from "../http/errorHandler";
import { JsonRequest } from "../http/jsonRequest";
import { GroupsRoutes } from "../routes";

export const PostCreateNewGroup = (group: Json) => JsonRequest(GroupsRoutes.addgroup, {method:"POST", body: group}).catch(handleUnauthorizedError)
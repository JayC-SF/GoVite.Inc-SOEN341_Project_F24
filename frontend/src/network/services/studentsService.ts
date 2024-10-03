import { handleUnauthorizedError } from "../http/errorHandler";
import { JsonRequest } from "../http/jsonRequest";
import { StudentsRoutes } from "../routes";

export const GetStudents = () => JsonRequest(StudentsRoutes.students, {method: "POST"}).catch(handleUnauthorizedError)


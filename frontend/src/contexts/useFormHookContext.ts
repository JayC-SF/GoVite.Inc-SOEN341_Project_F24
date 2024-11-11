import { createContext } from "react";
import { UseFormReturn } from "react-hook-form";

const UseFormHookContext = createContext<UseFormReturn<any> | undefined>(undefined)
export {UseFormHookContext}
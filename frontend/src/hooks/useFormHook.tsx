import {
  FieldValues,
  useForm,
  UseFormProps,
  UseFormReturn,
} from "react-hook-form";
import { PropsWithChildren, useContext, useRef } from "react"
import {UseFormHookContext} from "../contexts/useFormHookContext";

// hook to be used with the useForm library api
export function useFormHook<T extends FieldValues>(
  props: UseFormProps<T>
): [
  UseFormReturn<T, any, undefined>,
  (props: PropsWithChildren) => JSX.Element
] {
  const useFormData = useForm<T>(props);

  const Provider = ({ children }:PropsWithChildren) => (
    <UseFormHookContext.Provider {...props} value={useFormData}>
      {children}
    </UseFormHookContext.Provider>
  );
  const ProviderRef = useRef(Provider)

  return [useFormData, ProviderRef.current];
}

export function useFormHookContext<T extends FieldValues>() {
    const useFormData = useContext(UseFormHookContext)
    if (useFormData) {
        return useFormData as UseFormReturn<T>
    }
    return useFormData
}

import { object, string, InferType } from "yup";

export enum USERTYPE {
  CLIENT = "client",
  MERCHANT = "merchant",
}

export const loginSchema = object({
  email: string().email("Invalid Email").required("Email is required"),
  password: string()
    .min(6, "Password should be at least 6 characters")
    .required("Password is required"),
}).required();

export type LoginFormFields = InferType<typeof loginSchema>;

export const registerSchema = object({
  name: string().required("Name is required"),
  email: string().email("Invalid Email").required("Email is required"),
  password: string()
    .min(6, "Password should be at least 6 characters")
    .required("Password is required"),
  type: string()
    .oneOf([USERTYPE.CLIENT, USERTYPE.MERCHANT], "Please select an option")
    .required("Type is required"),
  dob: string().required("Date of birth is required"),
  studioName: string().when("type", (type, schema) => {
    return type[0] === USERTYPE.MERCHANT
      ? schema.required("Studio name is required")
      : schema;
  }),
  cityOfOperation: string().when("type", (type, schema) => {
    return type[0] === USERTYPE.MERCHANT
      ? schema.required("City of operation is required")
      : schema;
  }),
  cityOfResidence: string().when("type", (type, schema) => {
    return type[0] === USERTYPE.CLIENT
      ? schema.required("City of residence is required")
      : schema;
  }),
}).required();

export type RegisterFormFields = InferType<typeof registerSchema>;

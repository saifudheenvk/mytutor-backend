import { IPolicyDocument } from "../../../db/policies/policy.types";
import { RoleType } from "../../enum/role";

export type UserRequestBody = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    mobileNumber: String;
    roleType?: RoleType
  }

export type LoginUserResponseBody = {
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  token: string;
  policies: string [];
  role: string;
}
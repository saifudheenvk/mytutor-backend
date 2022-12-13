import { IPolicyDocument } from "../../../db/policies/policy.types";
import { RoleType } from "../../enum/role";

export interface UserRequestBody {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    mobileNumber: String;
    roleType?: RoleType
  }

export interface LoginUserResponseBody {
  id: string
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  token?: string;
  policies: string [];
  role: string;
  companyId: string
}
import { RoleType } from "../../enum/role/RoleType";

export interface UserRequestBody {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    mobileNumber: String;
    roleType?:RoleType
  }


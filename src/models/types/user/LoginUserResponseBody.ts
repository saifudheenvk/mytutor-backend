import { UserStatus } from "../../enum/user/UserStatus";

export interface LoginUserResponseBody {
    id: string
    firstName: string;
    lastName: string;
    name?: string;
    email: string;
    mobileNumber: string;
    token?: string;
    policies: string [];
    role: string;
    companyId: string;
    status: UserStatus
  }
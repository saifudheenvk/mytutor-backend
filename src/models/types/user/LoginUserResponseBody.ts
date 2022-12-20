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
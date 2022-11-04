export type UserRequestBody = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    mobileNumber: String;
  }

export type LoginUserResponseBody = {
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  token: string;
  policies: Array<string>;
  role: string;
}
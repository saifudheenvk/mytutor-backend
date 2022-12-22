import { Document, Model } from "mongoose";
import { UserRequestBody } from "../../models/types/user/UserRequestBody";
import { LoginUserResponseBody } from "../../models/types/user/LoginUserResponseBody";
import { UserStatus } from "../../models/enum/user/UserStatus";
import { ProfileResponse } from "../../models/types/user/ProfileResponse";

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  mobileNumber: string;
  archived: boolean;
  about: string;
  info: string;
  status: UserStatus
  createdAt: number;
  updatedAt: number;
}

export interface IUserDocument extends IUser, Document {
  name: string;
}

export interface IUserModel extends Model<IUserDocument> {
  registerUser: (this: IUserModel, user: UserRequestBody) => Promise<IUserDocument | string>
  login: (this: IUserModel, user: UserRequestBody) => Promise<LoginUserResponseBody | string>
  getUser: (this: IUserModel, id: string) => Promise<ProfileResponse | string>
  getMyDetails: (this: IUserModel, id: string) => Promise<LoginUserResponseBody | string>
  updateUserDetails: (this: IUserModel, data: ProfileResponse) => Promise<string | boolean>
}  
import { Document, Model } from "mongoose";
import { UserRequestBody } from "../../models/types/user/UserRequestBody";
import { LoginUserResponseBody } from "../../models/types/user/LoginUserResponseBody";

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  mobileNumber: string;
  archived: boolean;
  about: string;
  info: string;
  status: string
}

export interface IUserDocument extends IUser, Document { }

export interface IUserModel extends Model<IUserDocument> {
  registerUser: (this: IUserModel, user:UserRequestBody)=>Promise<IUserDocument | string>
  login: (this: IUserModel, user:UserRequestBody)=>Promise<LoginUserResponseBody | string>
  getUser: (this: IUserModel, id: string)=>Promise<LoginUserResponseBody | string>
}  
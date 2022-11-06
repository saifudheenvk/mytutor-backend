import { Document, Model } from "mongoose";
import { LoginUserResponseBody, UserRequestBody } from "../../models/types/user";
import { IRoleDocument } from "../role/role.types";

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string & IRoleDocument;
  mobileNumber: string;
  archived: boolean;
}

export interface IUserDocument extends IUser, Document { }

export interface IUserModel extends Model<IUserDocument> {
  registerUser: (this: IUserModel, user:UserRequestBody)=>Promise<any>
  login: (this: IUserModel, user:UserRequestBody)=>Promise<LoginUserResponseBody | string>
}
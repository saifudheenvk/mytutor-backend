import { Document, Model } from "mongoose";
import { UserRequestBody } from "../../models/user";

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  mobileNumber: String;

}

export interface IUserDocument extends IUser, Document { }

export interface IUserModel extends Model<IUserDocument> {
  registerUser: (this: IUserModel, user:UserRequestBody)=>Promise<any>
}
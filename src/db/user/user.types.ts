import { Document, Model } from "mongoose";

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  mobileNumber: String;

}

export interface IUserDocument extends IUser, Document {}

export interface IUserModel extends Model<IUserDocument> {}
import { Document, Model } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  passWord: string;
  role: string;
}

export interface IUserDocument extends IUser, Document {}

export interface IUserModel extends Model<IUserDocument> {}
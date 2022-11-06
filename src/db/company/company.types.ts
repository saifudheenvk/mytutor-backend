import { Document, Model } from "mongoose";
import { IUserDocument } from "../user/user.types";

export interface ICompany {
    name: string;
    description: string;
    isActivated: boolean;
    rating: IRating;
    user: string & IUserDocument
}

export interface IRating {
    score: number;
    count: number;
}

export interface ICompanyDocument extends Document, ICompany {}

export interface ICompanyModel extends Model<ICompanyDocument>{}
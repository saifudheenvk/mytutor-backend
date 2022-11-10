import { Model } from "mongoose";
import { ICompanyDocument } from "../company/company.types";
import { IUserDocument } from "../user/user.types";
import { IRoleDocument } from "./role.types";

export interface ICompanyRole {
    user: string & IUserDocument;
    company: string & ICompanyDocument;
    role: string & IRoleDocument;
}

export interface ICompanyRoleDocument extends ICompanyRole, Document{}

export interface ICompanyRoleModel extends Model<ICompanyRoleDocument>{}
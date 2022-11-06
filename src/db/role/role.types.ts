import { Document, Model } from "mongoose";
import { IPolicyDocument } from "../policies/policy.types";

export interface IRole{
    name: string;
    description: string;
    attachedPolicies: IPolicyDocument[];
}

export interface IRoleDocument extends IRole, Document{

}

export interface IRoleModel extends Model<IRoleDocument> {
    createRole: (this: IRoleModel, data: IRole)=>Promise<IRoleDocument>
}
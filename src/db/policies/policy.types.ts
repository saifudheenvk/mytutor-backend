import { Document, Model } from "mongoose";

export interface IPolicy{
    name: string;
    description: string;
    policies: string[];
}

export interface IPolicyDocument extends IPolicy, Document{}

export interface IPolicyModel extends Model<IPolicyDocument>{
    createPolicy: (this:IPolicyModel, data: IPolicyDocument) => Promise<IPolicyDocument>;
}
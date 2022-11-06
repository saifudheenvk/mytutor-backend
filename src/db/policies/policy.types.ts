import { Document, Model } from "mongoose";

export interface IPolicy{
    name: string;
    description: string;
    policies: string[];
}

export interface IPolicyDocument extends IPolicy, Document{}

export interface IPolicyModel extends Model<IPolicyDocument>{
    createPolicy: (this:IPolicyModel, data: IPolicyDocument) => Promise<IPolicyDocument>;
    createMultiplePolicies: (this:IPolicyModel, data: IPolicyDocument[]) => Promise<any>;
    getPoliciesByNames: (this:IPolicyModel, names: string[]) => Promise<any>;
}
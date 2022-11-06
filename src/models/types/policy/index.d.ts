import { PolicyType } from "../../enum/policy";

export type DefaultPolicyItem = {
    name: string;
    description: string;
    policies: string[];
    type?: PolicyType
}
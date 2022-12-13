import { PolicyType } from "../../enum/policy";

export interface DefaultPolicyItem {
    name: string;
    description: string;
    policies: string[];
    type?: PolicyType
}

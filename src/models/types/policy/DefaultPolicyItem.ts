import { PolicyType } from "../../enum/policy/PolicyType";

export interface DefaultPolicyItem {
    name: string;
    description: string;
    policies: string[];
    type: PolicyType
}

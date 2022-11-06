import { PolicyType } from "../../models/enum/policy";
import { DefaultPolicyItem } from "../../models/types/policy";
import { CREATE_POLICY_GRUPS, CREATE_ROLE } from "./policies";

export const policyGroups: Array<DefaultPolicyItem> = [
    {
        name: "Role&Policy Management",
        description: "Create or Update user roles and policies",
        policies:[CREATE_ROLE, CREATE_POLICY_GRUPS],
        type: PolicyType.BOTH
    }
]

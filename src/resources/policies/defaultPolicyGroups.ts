import { IPolicy } from "../../db/policies/policy.types";
import { CREATE_POLICY_GRUPS, CREATE_ROLE } from "./policies";


export const policyGroups: Array<IPolicy> = [
    {
        name: "Role&Policy Management",
        description: "Create or Update user roles and policies",
        policies:[CREATE_ROLE, CREATE_POLICY_GRUPS]
    }
]

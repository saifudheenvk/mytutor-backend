import { PolicyType } from "../../models/enum/policy/PolicyType";
import { DefaultPolicyItem } from "../../models/types/policy/DefaultPolicyItem";
import { CREATE_POLICY_GRUPS, CREATE_ROLE, GET_MY_PROFILE, GET_USER_PROFILE, UPDATE_USER_PROFILE } from "./policies";

export const policyGroups: Array<DefaultPolicyItem> = [
    {
        name: "Role&Policy Management",
        description: "Create or Update user roles and policies",
        policies: [CREATE_ROLE, CREATE_POLICY_GRUPS],
        type: PolicyType.BOTH
    }, {
        name: "Basic Auth",
        description: "For basic authentication puposes",
        policies: [GET_MY_PROFILE],
        type: PolicyType.BOTH
    }
    , {
        name: "Get Users",
        description: "Get user details",
        policies: [GET_USER_PROFILE],
        type: PolicyType.BOTH
    }, {
        name: "Manage My Profile",
        description: "Manage My Profile",
        policies: [GET_MY_PROFILE, UPDATE_USER_PROFILE],
        type: PolicyType.BOTH
    }
]

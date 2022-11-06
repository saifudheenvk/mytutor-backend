import PolicyModel from "../../db/policies/model"
import { policyGroups } from "../../resources/policies/defaultPolicyGroups"


export async function createDefaultPolicies() {
    try {
        await PolicyModel.insertMany(policyGroups)
        console.log("Created default policies")
    } catch (error) {
        console.log("Couldn't create default policies", error)
    }
}
import PolicyModel from "../../db/policies/model"
import { policyGroups } from "../../resources/policies/defaultPolicyGroups"
import { createDefaultRole } from "../role";


export async function createDefaultPolicies() {
    try {
        for(let i=0; i<policyGroups.length;i++){
            delete policyGroups[i].type
            await PolicyModel.updateOne({ name: policyGroups[i].name }, policyGroups[i], { upsert: true })
        }
        console.log("Created default policies")
        await createDefaultRole();
    } catch (error) {
        console.log("Couldn't create default policies", error)
    }
}
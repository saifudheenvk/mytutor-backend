import PolicyModel from "../../db/policies/model"
import { IRoleDocument } from "../../db/role/role.types";
import { policyGroups } from "../../resources/policies/defaultPolicyGroups"
import { createDefaultRole, getRoleByUserId } from "../role";


export async function createDefaultPolicies() {
    try {
        for (let i = 0; i < policyGroups.length; i++) {
            await PolicyModel.updateOne({ name: policyGroups[i].name }, { name: policyGroups[i].name, description: policyGroups[i].description, policies: policyGroups[i].policies }, { upsert: true })
        }
        console.log("Created default policies")
        await createDefaultRole();
    } catch (error) {
        console.log("Couldn't create default policies", error)
    }
}

async function getUserPolicies(userId: string) {
    try {
        const role: IRoleDocument | undefined = await getRoleByUserId(userId)
        if (role) {
            return role.attachedPolicies.flatMap(p => p.policies);
        } else return []
    } catch (error) {
        console.log(error)
        return []
    }
}
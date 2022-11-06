import PolicyModel from "../../db/policies/model";
import RoleModel from "../../db/role/model";
import { policyGroups } from "../../resources/policies/defaultPolicyGroups";
import { defaultRoles } from "../../resources/roles/defaultRoles";

export async function createDefaultRole() {
    try {
        for (let i = 0; i < defaultRoles.length; i++) {
            const names = policyGroups.map(p => p.name);
            var policies = PolicyModel.getPoliciesByNames(names);
            RoleModel.findOneAndUpdate({ name: defaultRoles[i].name }, { ...defaultRoles[i], attachedPolices: policies }, { upsert: true })
        }
        console.log("Created default roles")
    } catch (error) {
        console.log("Couldn't create default roles", error)
    }
}
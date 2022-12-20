import CompanyModel from "../../db/company/model";
import PolicyModel from "../../db/policies/model";
import CompanyRoleModel from "../../db/role/companyRole.model";
import RoleModel from "../../db/role/model";
import { PolicyType } from "../../models/enum/policy";
import { policyGroups } from "../../resources/policies/defaultPolicyGroups";
import { defaultRoles } from "../../resources/roles/defaultRoles";

export async function createDefaultRole() {
    try {

        for (let i = 0; i < defaultRoles.length; i++) {
            const names = policyGroups.filter(p => p.type == defaultRoles[i].type || p.type === PolicyType.BOTH).map(p => p.name);
            console.log(policyGroups[0])
            var policies = await PolicyModel.getPoliciesByNames(names);
            const role = { ...defaultRoles[i], attachedPolicies: policies };
            await RoleModel.updateOne({ name: defaultRoles[i].name }, role, { upsert: true })
        }
        console.log("Created default roles")
    } catch (error) {
        console.log("Couldn't create default roles", error)
    }
}


export async function getRoleByUserId(userId:string) {
    try {
        const company = await CompanyModel.findOne({user: userId})
        const companyRole = await CompanyRoleModel.findOne({user: userId, company: company?._id}).populate({
            path: "role",
            populate: {
                path: "attachedPolicies",
                model: 'policy'
            }
        });
        return companyRole?.role
    } catch (error) {
        console.log(error);
    }
}
import CompanyRoleModel from "../../db/role/companyRole.model";
import UserModel from "../../db/user/model";
import { defaultUsers } from "../../resources/roles/defaultUsers";
import { getUserPolicies } from "../policy";

export async function checkUserPolicies(id: string, companyId: string) {
    let policies: string[] = []
    try {
        if (companyId) {
            policies = await CompanyRoleModel.getCompanyPolicies(id, companyId)
        } else {
            policies = await getUserPolicies(id)
        }
        return policies
    } catch (error) {
        console.log("Couldn't fetch policies")
        return policies
    }
}

export async function createDefaultUsers() {
    try {
        for (let i = 0; i < defaultUsers.length; i++) {
            const data = await UserModel.registerUser(defaultUsers[i])
            if (data && typeof data !== "string" && data._id) {
                console.log("Created user with Id" + data._id)
            } else {
                console.log(data)
            }
        }
    } catch (error) {
        console.log("Couldn't create users")
    }
}
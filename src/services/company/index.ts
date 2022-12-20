import { randomUUID } from "crypto";
import CompanyModel from "../../db/company/model";
import CompanyRoleModel from "../../db/role/companyRole.model";
import RoleModel from "../../db/role/model";
import { RoleType } from "../../models/enum/role/RoleType";

export async function registerFirstCompany(userId: string) {
    try {
        const role = await RoleModel.findOne({ type: RoleType.COMPANY_ADMIN })
        const company = await CompanyModel.create({
            name: randomUUID(),
            description: "Not Activated",
            user: userId,
            rating: {
                count: 0,
                score: 0
            }
        })
        if (role && company) {
            await CompanyRoleModel.create({ user: userId, company: company._id, role: role._id })
        }
    } catch (error) {
        console.log("Couldn't register company")
    }
}
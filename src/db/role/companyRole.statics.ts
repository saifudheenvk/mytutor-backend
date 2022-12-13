import { ICompanyRoleModel } from "./comapnyRole.types";

async function getCompanyPolicies(this:ICompanyRoleModel, userId:string, companyId:string) {
    const record = await this.findOne({user: userId, company: companyId}).populate({
        path: "role",
        populate: {
            path: "attachedPolicies",
            model: 'policy'
        }
    })
    if(record){
        return record.role.attachedPolicies.flatMap(p => p.policies);
    } else return []
}

export default { getCompanyPolicies }
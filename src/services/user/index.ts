import UserModel from "../../db/user/model";
import { IUserDocument } from "../../db/user/user.types";
import { defaultUsers } from "../../resources/roles/defaultUsers";

export async function checkUserPolicies(id: string, companyId:string) {
    const record: IUserDocument | null = await UserModel.findById(id).populate({
        path: "role",
        populate: {
            path: "attachedPolicies",
            model: 'policy'
        }
    });
    if (record) {
        const policies = record.role.attachedPolicies.flatMap(p => p.policies);
        return policies;
    } else return []
}

export async function createDefaultUsers() {
    try {
        for (let i = 0; i < defaultUsers.length; i++) {
            const data = await UserModel.registerUser(defaultUsers[i])
            if(data&&data._id){
                console.log("Created user with Id"+data._id)
            } else{
                console.log(data)
            }
        }
    } catch (error) {
        console.log("Couldn't create users")
    }
}
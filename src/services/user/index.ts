import UserModel from "../../db/user/model";
import { IUserDocument } from "../../db/user/user.types";

export async function getUserPolicies(id: string) {
    const record: IUserDocument | null = await UserModel.findById(id).populate({
        path: "role",
        populate: {
            path: "attachedPolicies",
            model: 'policies'
        }
    });
    if (record) {
        const policies = record.role.attachedPolicies.flatMap(p => p.policies);
        return policies;
    } else return []
}
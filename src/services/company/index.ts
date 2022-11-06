import { randomUUID } from "crypto";
import CompanyModel from "../../db/company/model";

export async function registerFirstCompany(userId: string) {
    await CompanyModel.create({
        name: randomUUID(),
        description: "Not Activated",
        user: userId,
        rating:{
            count: 0,
            score: 0
        }
    })
}
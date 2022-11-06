import { IPolicyDocument, IPolicyModel } from "./policy.types";



async function createPolicy(this: IPolicyModel, policy: IPolicyDocument) {
    const record = await this.findByIdAndUpdate(policy._id, policy, { upsert: true })
    return record;
}
async function createMultiplePolicies(this: IPolicyModel, policy: IPolicyDocument[]) {
    const record = await this.updateMany( policy, { upsert: true })
    return record;
}

export async function getPoliciesByNames(this: IPolicyModel, names: string[]) {
    const policies = await this.find({
        name: { "$in": names }
    })
    return policies;
}


export default { createPolicy, createMultiplePolicies, getPoliciesByNames }
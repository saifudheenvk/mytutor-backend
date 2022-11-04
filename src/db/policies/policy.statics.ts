import { IPolicyDocument, IPolicyModel } from "./policy.types";



async function createPolicy(this: IPolicyModel, role: IPolicyDocument) {
    const record = await this.findByIdAndUpdate(role._id, role, { upsert: true })
    return record;
}

export default { createPolicy }
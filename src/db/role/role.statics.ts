import { IRoleDocument, IRoleModel } from "./role.types";



async function createRole(this: IRoleModel, role: IRoleDocument) {
    const record = await this.findByIdAndUpdate(role._id, role, { upsert: true })
    return record;
}

export default { createRole }
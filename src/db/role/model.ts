import * as Mongoose from "mongoose";
import { IRoleDocument, IRoleModel } from "./role.types";
import statics from "./role.statics"

const RoleSchema = new Mongoose.Schema<IRoleDocument, IRoleModel>({
  name: {
    required: true,
    type: String
  },
  attachedPolicies:{
    required: true,
    type: [Mongoose.Schema.Types.ObjectId],
    ref: ""
  }
});

RoleSchema.statics = statics;

const RoleModel: IRoleModel = Mongoose.model<IRoleDocument, IRoleModel>(
    "roles",
    RoleSchema
  );
  export default RoleModel;
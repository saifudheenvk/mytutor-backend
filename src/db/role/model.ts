import * as Mongoose from "mongoose";
import { IRoleDocument, IRoleModel } from "./role.types";

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

const RoleModel: IRoleModel = Mongoose.model<IRoleDocument, IRoleModel>(
    "roles",
    RoleSchema
  );
  export default RoleModel;
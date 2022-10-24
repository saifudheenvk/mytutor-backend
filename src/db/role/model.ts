import * as Mongoose from "mongoose";
import { IRoleDocument, IRoleModel } from "./role.types";

const RoleSchema = new Mongoose.Schema<IRoleDocument, IRoleModel>({
  name: {
    required: true,
    type: String
  },
  attachedPolicies:{
    required: true,
    type: [Number]
  }
});

const RoleModel: IRoleModel = Mongoose.model<IRoleDocument, IRoleModel>(
    "users",
    RoleSchema
  );
  export default RoleModel;
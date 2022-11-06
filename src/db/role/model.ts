import * as Mongoose from "mongoose";
import { IRoleDocument, IRoleModel } from "./role.types";
import statics from "./role.statics"

const RoleSchema = new Mongoose.Schema<IRoleDocument, IRoleModel>({
  name: {
    required: true,
    type: String,
    unique: true
  },
  description: {
    type: String
  },
  attachedPolicies: {
    required: true,
    type: [Mongoose.Schema.Types.ObjectId],
    ref: "policy"
  },
  type: {
    required: true,
    type: Number,
    enum: [0, 1, 2],
    default: 1
  }
});

RoleSchema.statics = statics;

const RoleModel: IRoleModel = Mongoose.model<IRoleDocument, IRoleModel>(
  "role",
  RoleSchema
);
export default RoleModel;
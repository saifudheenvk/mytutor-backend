import * as Mongoose from "mongoose";
import { IUserDocument, IUserModel } from "./user.types";
import statics from "./user.satics"


const UserSchema = new Mongoose.Schema<IUserDocument, IUserModel>({
  firstName: {
    type: String,
    required: true
  },
  lastName: String,
  mobileNumber: {
    type: String,
    required: true
  },
  password: String,
  archived: {
    type: Boolean,
    required: true,
    default: false
  },
  email: String,
  role: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: "role",
    required: true
  }
});

UserSchema.statics = statics;

const UserModel: IUserModel = Mongoose.model<IUserDocument, IUserModel>(
  "user",
  UserSchema
);
export default UserModel;
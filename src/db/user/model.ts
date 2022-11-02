import * as Mongoose from "mongoose";
import { IUserDocument, IUserModel } from "./user.types";

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
  email: String,
  role: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: "roles"
  }
});

const UserModel: IUserModel = Mongoose.model<IUserDocument, IUserModel>(
    "users",
    UserSchema
  );
  export default UserModel;
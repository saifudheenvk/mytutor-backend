import * as Mongoose from "mongoose";
import { IUserDocument, IUserModel } from "./user.types";

const UserSchema = new Mongoose.Schema<IUserDocument, IUserModel>({
  name: String,
  passWord: String,
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
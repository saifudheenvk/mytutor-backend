import * as Mongoose from "mongoose";
import { UserRequestBody } from "../../models/user";
import { IUserDocument, IUserModel } from "./user.types";
import bcrypt from "bcrypt"

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

UserSchema.statics = {
  registerUser: async function name(this: IUserModel, userObj: UserRequestBody) {
    const record = await this.findOne({ email: userObj.email });
    if (record) {
      return { message: "already user exist with this email id", data: null };
    } else {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(userObj.password, salt);
      const newUser = await this.create({ ...userObj, password: hash });
      return { message: "Success", data: newUser };
    }
  }
}

const UserModel: IUserModel = Mongoose.model<IUserDocument, IUserModel>(
  "users",
  UserSchema
);
export default UserModel;
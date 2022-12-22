import * as Mongoose from "mongoose";
import { IUserDocument, IUserModel } from "./user.types";
import statics from "./user.satics"


const UserSchema = new Mongoose.Schema<IUserDocument, IUserModel>({
  firstName: {
    type: String,
    required: true
  },
  lastName: String,
  info: String,
  about: String,
  mobileNumber: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  archived: {
    type: Boolean,
    required: true,
    default: false
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  status: {
    required: true,
    type: Number,
    enum: [0, 1, 2],
    default: 0
  }
}, { timestamps: true });

UserSchema.statics = statics;

UserSchema.virtual('name').get(function () {
  return `${this.firstName} ${this.lastName}`;
}).set(function (v) {
  const firstName = v.substring(0, v.indexOf(' '));
  const lastName = v.substring(v.indexOf(' ') + 1);
  this.set({ firstName, lastName });
})

const UserModel: IUserModel = Mongoose.model<IUserDocument, IUserModel>(
  "user",
  UserSchema
);
export default UserModel;
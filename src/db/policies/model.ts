import * as Mongoose from "mongoose";
import { IPolicyDocument, IPolicyModel } from "./policy.types";
import statics from "./policy.statics"


const PolicySchema = new Mongoose.Schema<IPolicyDocument, IPolicyModel>({
  name: {
    required: true,
    type: String,
    unique: true
  },
  policies:{
    required: true,
    type: [String]
  },
  description: {
    required: true,
    type: String
  }
});

PolicySchema.statics = statics;

const PolicyModel: IPolicyModel = Mongoose.model<IPolicyDocument, IPolicyModel>(
    "policies",
    PolicySchema
  );
  export default PolicyModel;
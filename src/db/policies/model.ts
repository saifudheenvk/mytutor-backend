import * as Mongoose from "mongoose";
import { IPolicyDocument, IPolicyModel } from "./policy.types";


const PolicySchema = new Mongoose.Schema<IPolicyDocument, IPolicyModel>({
  name: {
    required: true,
    type: String
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

const PolicyModel: IPolicyModel = Mongoose.model<IPolicyDocument, IPolicyModel>(
    "policies",
    PolicySchema
  );
  export default PolicyModel;
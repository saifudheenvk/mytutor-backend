import * as Mongoose from "mongoose";
import { ICompanyRoleDocument, ICompanyRoleModel } from "./comapnyRole.types";
import statics from "./companyRole.statics"


const CompanyRoleSchema = new Mongoose.Schema<ICompanyRoleDocument, ICompanyRoleModel>({
    role: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: "role",
        required: true
      },
      user: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
      },
      company: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: "company",
        required: true
      }
});

CompanyRoleSchema.statics = statics;


const CompanyRoleModel: ICompanyRoleModel = Mongoose.model<ICompanyRoleDocument, ICompanyRoleModel>(
  "companyRole",
  CompanyRoleSchema
);
export default CompanyRoleModel;
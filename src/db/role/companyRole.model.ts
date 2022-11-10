import * as Mongoose from "mongoose";
import { ICompanyRoleDocument, ICompanyRoleModel } from "./comapnyRole.types";


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


const CompanyRoleModel: ICompanyRoleModel = Mongoose.model<ICompanyRoleDocument, ICompanyRoleModel>(
  "companyRole",
  CompanyRoleSchema
);
export default CompanyRoleModel;
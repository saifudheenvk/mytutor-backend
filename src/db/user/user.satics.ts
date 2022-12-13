import { LoginUserResponseBody, UserRequestBody } from "../../models/types/user";
import { IUserDocument, IUserModel } from "./user.types";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { registerFirstCompany } from "../../services/company";
import RoleModel from "../role/model";
import { ICompanyDocument } from "../company/company.types";
import CompanyModel from "../company/model";

async function registerUser(this: IUserModel, userObj: UserRequestBody) {
    const record = await this.findOne({ "$or": [{ email: userObj.email }, { mobileNumber: userObj.mobileNumber }] });
    if (record) {
        return "already user exist with this email id or mobile number";
    } else {
        const role = RoleModel.findOne({type: userObj.roleType})
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(userObj.password, salt);
        delete userObj.roleType
        const newUser = await this.create({ ...userObj, password: hash, role });
        await registerFirstCompany(newUser._id)
        return newUser;
    }
}

async function login(this: IUserModel, userObj: { email: string, password: string }) {
    const record: IUserDocument | null = await this.findOne({ email: userObj.email }).populate({
        path: "role",
        populate: {
            path: "attachedPolicies",
            model: 'policy'
        }
    });
    if (record) {
        const validPass = await bcrypt.compare(userObj.password, record?.password);
        if (validPass) {
            var policies = record.role.attachedPolicies.flatMap(p=> p.policies)
            const token = jwt.sign({ userId: record._id },
                process.env.JWT_TOKEN as string,
                { expiresIn: "2d" }
            );
            const company:ICompanyDocument | null = await CompanyModel.findOne({user: record._id})
            const response: LoginUserResponseBody = {
                id: record.id,
                firstName: record.firstName,
                lastName: record.lastName,
                mobileNumber: record.mobileNumber,
                token,
                email: record.email,
                role: record.role._id,
                policies: policies,
                companyId: company?.id
            }
            return response;
        } else return "Incorrect Password.";
    } else return "Incorrect Email.";

}

async function getUser(this:IUserModel, id: string) {
    const record: IUserDocument | null = await this.findById(id).populate({
        path: "role",
        populate: {
            path: "attachedPolicies",
            model: 'policy'
        }
    });
    if(record){
        const company:ICompanyDocument | null = await CompanyModel.findOne({user: record._id})
        var policies = record.role.attachedPolicies.flatMap(p=> p.policies)
        const response: LoginUserResponseBody = {
            id: record.id,
            firstName: record.firstName,
            lastName: record.lastName,
            mobileNumber: record.mobileNumber,
            email: record.email,
            role: record.role._id,
            policies: policies,
            companyId: company?.id
        }
        return response;
    } else return "No user with id "+id;
}

async function getUserPolicies(this:IUserModel, id:string) {
    const record = await this.findById(id).populate({
        path: "role",
        populate: {
            path: "attachedPolicies",
            model: 'policy'
        }
    })
    if(record){
        return record.role.attachedPolicies.flatMap(p => p.policies);
    } else return []
}

export default { registerUser, login, getUser, getUserPolicies }
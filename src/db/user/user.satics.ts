import { LoginUserResponseBody, UserRequestBody } from "../../models/types/user";
import { IUserDocument, IUserModel } from "./user.types";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { registerFirstCompany } from "../../services/company";
import { ICompanyDocument } from "../company/company.types";
import CompanyModel from "../company/model";
import { getRoleByUserId } from "../../services/role";
import { IRoleDocument } from "../role/role.types";

async function registerUser(this: IUserModel, userObj: UserRequestBody) {
    try {
        const record = await this.findOne({ "$or": [{ email: userObj.email }, { mobileNumber: userObj.mobileNumber }] });
    if (record) {
        return "already user exist with this email id or mobile number";
    } else {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(userObj.password, salt);
        const newUser = await this.create({ ...userObj, password: hash });
        await registerFirstCompany(newUser._id)
        return newUser;
    }
    } catch (error) {
        console.log(error)
        return "Couldn't create this user"
    }
}

async function login(this: IUserModel, userObj: { email: string, password: string }) {
    const record: IUserDocument | null = await this.findOne({ email: userObj.email });
    if (record) {
        const validPass = await bcrypt.compare(userObj.password, record?.password);
        const role:IRoleDocument|undefined = await getRoleByUserId(record.id)
        if (validPass && role) {
            var policies = role.attachedPolicies.flatMap(p=> p.policies)
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
                role: role.id,
                policies: policies,
                companyId: company?.id
            }
            return response;
        } else return "Incorrect Password.";
    } else return "Incorrect Email.";

}

async function getUser(this:IUserModel, id: string) {
    const record: IUserDocument | null = await this.findById(id);
    if(record){
        const company:ICompanyDocument | null = await CompanyModel.findOne({user: record._id})
        const role:IRoleDocument|undefined = await getRoleByUserId(record.id)
        if(role){
            var policies = role.attachedPolicies.flatMap(p=> p.policies)
            const response: LoginUserResponseBody = {
                id: record.id,
                firstName: record.firstName,
                lastName: record.lastName,
                mobileNumber: record.mobileNumber,
                email: record.email,
                role: role.id,
                policies: policies,
                companyId: company?.id
            }
            return response;
        }else{
            return "Couldn't find role for this user"
        }
    } else return "No user with id "+id;
}

export default { registerUser, login, getUser }
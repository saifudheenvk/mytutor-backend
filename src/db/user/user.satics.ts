import { UserRequestBody } from "../../models/types/user/UserRequestBody";
import { IUserDocument, IUserModel } from "./user.types";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { registerFirstCompany } from "../../services/company";
import { ICompanyDocument } from "../company/company.types";
import CompanyModel from "../company/model";
import { getRoleByUserId } from "../../services/role";
import { IRoleDocument } from "../role/role.types";
import { LoginUserResponseBody } from "../../models/types/user/LoginUserResponseBody";
import { UserStatus } from "../../models/enum/user/UserStatus";
import { ProfileResponse } from "../../models/types/user/ProfileResponse";
import UserModel from "./model";

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
        const role: IRoleDocument | undefined = await getRoleByUserId(record.id)
        if (validPass && role) {
            var policies = role.attachedPolicies.flatMap(p => p.policies)
            const token = jwt.sign({ userId: record._id },
                process.env.JWT_TOKEN as string,
                { expiresIn: "2d" }
            );
            const company: ICompanyDocument | null = await CompanyModel.findOne({ user: record._id })
            const response: LoginUserResponseBody = {
                id: record.id,
                firstName: record.firstName,
                lastName: record.lastName,
                mobileNumber: record.mobileNumber,
                token,
                email: record.email,
                role: role.id,
                policies: policies,
                companyId: company?.id,
                status: record.status
            }
            if (record.status === UserStatus.DRAFTED) {
                record.status = UserStatus.CONFIRMED
                record.save();
            }
            return response;
        } else return "Incorrect Password.";
    } else return "Incorrect Email.";

}

async function getMyDetails(this: IUserModel, id: string) {
    const record: IUserDocument | null = await this.findById(id);
    if (record) {
        const company: ICompanyDocument | null = await CompanyModel.findOne({ user: record._id })
        const role: IRoleDocument | undefined = await getRoleByUserId(record.id)
        if (role) {
            var policies = role.attachedPolicies.flatMap(p => p.policies)
            const response: LoginUserResponseBody = {
                id: record.id,
                firstName: record.firstName,
                lastName: record.lastName,
                mobileNumber: record.mobileNumber,
                email: record.email,
                role: role.id,
                policies: policies,
                companyId: company?.id,
                status: record.status
            }
            return response;
        } else {
            return "Couldn't find role for this user"
        }
    } else return "No user with id " + id;
}

async function getUser(this: IUserModel, id: string) {
    const record: IUserDocument | null = await this.findById(id);
    if (record) {
        const company: ICompanyDocument | null = await CompanyModel.findOne({ user: record._id })
        const response: ProfileResponse = {
            id: record.id,
            mobileNumber: record.mobileNumber,
            email: record.email,
            companyId: company?.id,
            about: record.about,
            info: record.info,
            name: record.name
        }
        return response;
    } else return "No user with id " + id;
}

async function updateUserDetails(this: IUserModel, data: ProfileResponse) {

    try {
        const updatedRecord = await UserModel.updateOne({ _id: data?._id }, { ...data, status: UserStatus.DETAILS_ADDED }, { upsert: true });
        if (updatedRecord) {
            return "Updated user with id " + data?._id;
        } else return false;
    } catch (error) {
        console.log(error)
        return false;
    }
}

export default { registerUser, login, getUser, getMyDetails, updateUserDetails }
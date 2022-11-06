import { LoginUserResponseBody, UserRequestBody } from "../../models/user";
import { IUserDocument, IUserModel } from "./user.types";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function registerUser(this: IUserModel, userObj: UserRequestBody) {
    const record = await this.findOne({ "$or": [{ email: userObj.email }, { mobileNumber: userObj.mobileNumber }] });
    if (record) {
        return "already user exist with this email id or mobile number";
    } else {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(userObj.password, salt);
        const newUser = await this.create({ ...userObj, password: hash });
        return newUser;
    }
}

async function login(this: IUserModel, userObj: { email: string, password: string }) {
    const record: IUserDocument | null = await this.findOne({ email: userObj.email }).populate({
        path: "role",
        populate: {
            path: "attachedPolicies",
            model: 'policies'
        }
    });
    if (record) {
        const validPass = await bcrypt.compare(userObj.password, record?.password);
        if (validPass) {
            const policies = record.role.attachedPolicies.flatMap(p=> p.policies)
            const token = jwt.sign({ userId: record._id },
                process.env.JWT_TOKEN as string,
                { expiresIn: "2d" }
            );
            const response: LoginUserResponseBody = {
                firstName: record.firstName,
                lastName: record.lastName,
                mobileNumber: record.mobileNumber,
                token,
                email: record.email,
                role: record.role._id,
                policies: policies
            }
            return response;
        } else return "Incorrect Password.";
    } else return "Incorrect Email.";

}

export default { registerUser, login }
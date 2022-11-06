import { RoleType } from "../../models/enum/role";
import { UserRequestBody } from "../../models/types/user";


export const defaultUsers: Array<UserRequestBody> = [
    {
        firstName:"Saifudheen",
        lastName: "VK",
        email: "vksaifudheen4@gmail.com",
        password: "Password@123",
        mobileNumber: "70344405842",
        roleType: RoleType.SUPER_ADMIN
    }
]

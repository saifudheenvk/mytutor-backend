import { RoleType } from "../../models/enum/role/RoleType";



export const defaultRoles: Array<any> = [
    {
        name: "Super Admin",
        description: "He is the top most user",
        type: RoleType.SUPER_ADMIN
    },{
        name: "Company Admin",
        description: "Account owner role",
        type: RoleType.COMPANY_ADMIN
    }
]

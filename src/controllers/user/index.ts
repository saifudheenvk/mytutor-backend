import { Request, Response } from "express";
import UserModel from "../../db/user/model";
import { IUserDocument } from "../../db/user/user.types";
import ApiRespnse from "../../models/ApiResponse";
import { RoleType } from "../../models/enum/role/RoleType";
import { LoginUserResponseBody } from "../../models/types/user/LoginUserResponseBody";
import { registerValidation, loginValidation } from "./validation"


export const registerUser = async (req: Request, res: Response) => {
    const validated = registerValidation(req.body)
    if (validated.error) {
        res.status(200).send(new ApiRespnse(0, validated.error.details[0].message));
    } else {
        try {
            const data: IUserDocument | string = await UserModel.registerUser({ ...req.body, roleType: RoleType.COMPANY_ADMIN })
            if (typeof data === "string") {
                res.status(200).send(new ApiRespnse(0, data));
            } else res.status(200).send(new ApiRespnse(1, data))
        } catch (err) {
            res.status(200).send(new ApiRespnse(0, err));
        }
    }
}

export const login = async (req: Request, res: Response) => {
    const validated = loginValidation(req.body)
    if (validated.error) {
        res.status(200).send(new ApiRespnse(0, validated.error.details[0].message));
    } else {
        try {
            const data: LoginUserResponseBody | string = await UserModel.login(req.body)
            if (typeof data === "string") {
                res.status(200).send(new ApiRespnse(0, data));
            } else res.status(200).send(new ApiRespnse(1, data))
        } catch (err) {
            res.status(200).send(new ApiRespnse(0, err));
        }
    }
}

export const getUser = async (req: Request, res: Response) => {
    const userId = req.params.userId
    if (userId) {
        res.status(200).send(new ApiRespnse(0, "Please provide user id"));
    } else {
        try {
            const data: LoginUserResponseBody | string = await UserModel.getUser(userId)
            if (typeof data === "string") {
                res.status(200).send(new ApiRespnse(0, data));
            } else res.status(200).send(new ApiRespnse(1, data))
        } catch (err) {
            res.status(200).send(new ApiRespnse(0, err));
        }
    }
}
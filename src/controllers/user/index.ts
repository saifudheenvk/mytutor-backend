import { Request, Response } from "express";
import UserModel from "../../db/user/model";
import { IUserDocument } from "../../db/user/user.types";
import { registerValidation } from "./validation"

module.exports = {
    registerUser: async (req: Request, res: Response) => {
        const validated = registerValidation(req.body)
        if (validated.error) {
            res.status(400).send(new ApiRespnse(0,validated.error.details[0].message));
        } else {
            try {
                const data:IUserDocument = await UserModel.registerUser(req.body)
                res.status(200).send(new ApiRespnse(1,data))
            } catch (err) {
                res.status(500).send(new ApiRespnse(0, err));
            }
        }
    }
}
import { Request, Response } from "express";
import RoleModel from "../../db/role/model";
import { IRoleDocument } from "../../db/role/role.types";
import ApiRespnse from "../../models/ApiResponse";
import { updateValidation } from "./validation"


export const createRole = async (req: Request, res: Response) => {
    const validated = updateValidation(req.body)
    if (validated.error) {
        res.status(400).send(new ApiRespnse(0, validated.error.details[0].message));
    } else {
        try {
            const data: IRoleDocument = await RoleModel.createRole(req.body)
            res.status(200).send(new ApiRespnse(1, data))
        } catch (err) {
            res.status(500).send(new ApiRespnse(0, err));
        }
    }
}
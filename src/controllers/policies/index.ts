import { Request, Response } from "express";
import PolicyModel from "../../db/policies/model";
import { IPolicyDocument } from "../../db/policies/policy.types";
import ApiRespnse from "../../models/ApiResponse";
import { updateValidation } from "./validation"


export const createPolicy = async (req: Request, res: Response) => {
    const validated = updateValidation(req.body)
    if (validated.error) {
        res.status(400).send(new ApiRespnse(0, validated.error.details[0].message));
    } else {
        try {
            const data: IPolicyDocument = await PolicyModel.createPolicy(req.body)
            res.status(200).send(new ApiRespnse(1, data))
        } catch (err) {
            res.status(500).send(new ApiRespnse(0, err));
        }
    }
}
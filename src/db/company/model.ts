import * as Mongoose from "mongoose";
import { ICompanyDocument, ICompanyModel } from "./company.types";



const RatingSchema = new Mongoose.Schema({
    score: Number,
    count: Number
}, {
    _id: false
})

const CompanySchema = new Mongoose.Schema<ICompanyDocument, ICompanyModel>({
    name: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String
    },
    isActivated: {
        type: Boolean,
        required: true,
        default: false
    },
    user: {
        type: Mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user",
    },
    rating: {
        required: true,
        type: RatingSchema
    }
})

const CompanyModel: ICompanyModel = Mongoose.model<ICompanyDocument, ICompanyModel>("company", CompanySchema);

export default CompanyModel;
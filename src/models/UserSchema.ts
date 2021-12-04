import {Schema, Types} from "mongoose";
import {IUser} from "./IUser";

const userSchema = new Schema<IUser>({
    _id: Types.ObjectId,
    userName: {
        type: "string",
        required: true
    },
    dob: {
        type: "date",
        required: true
    },
    email: {
        type: "string",
        required: true
    },
    address: {
        type: "string",
        required: true
    },
    phone: {
        type: "string",
        required: true
    },
    password: {
        type: "string",
        required: true
    }
});

export default userSchema;

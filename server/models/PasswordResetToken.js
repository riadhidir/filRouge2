import mongoose from "mongoose";
const {Schema, model} = mongoose;
const options = {
    timestamps: true,
};
const schema = new Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    token: {
        type: String,
        required: true
    },
    // token_expiry : {
    //     type: Date,
    //     default: () => new Date(Date.now() + 60 * 60 * 1000)
    // }
},options);

const PasswordResetToken = model("PasswordResetToken", schema);

export default PasswordResetToken;
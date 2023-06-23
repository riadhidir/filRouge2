import mongoose from "mongoose";
import roles from "../config/roles.js";
import CustomError from "../utils/Error.js";
//destructure roles
const { ADMIN,STUDENT,TEACHER,LIBRARIAN} = roles;
const {Schema, model} = mongoose;

const options= {
    timestamps:true 
}
const userSchema = new Schema({
    f_name:{
        type: String,
        required: true
    },
    
    l_name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required:true,
        unique:true
    },
    password: {
        type:String,
        required:true
    },
    university:{
        type : Schema.Types.ObjectId,
        ref: "University",
        required:true
        // type:String
    },
    phone:{
        type: String,
        default:""
    },
    role:{
        type: String,
        Enum: [ADMIN, LIBRARIAN, STUDENT, TEACHER],
        required:true
    },   
    state: { //users always active :: in the case of the admin hew ont have apssword in the begining
        type: String,
        enum:['active','disabled'], 
        default: 'active' 
    },

    refreshToken:{
        type: String,
        default:""
    }

},options);
userSchema.statics.getUser = async function (userID){
    const foundUser = await User.findById(userID,'f_name l_name email role phone university');
    if(!foundUser) throw new CustomError('User not found',404);
    return foundUser;
}

const User = new model("User", userSchema);
export default User;
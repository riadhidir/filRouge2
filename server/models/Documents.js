import mongoose from "mongoose";

import CustomError from "../utils/Error.js";
//destructure roles
const options= {
    discriminatorKey :"type",
    timestamps:true 
}
const {Schema, model} = mongoose;


const documentSchema = new Schema({
    title:{
        type: String,
        required: true
    },
   
    authors:[{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    university:{
        type :Schema.Types.ObjectId,
        ref: "University"

    },
    date:{
        type: String,
        required:true,
    
    },
    language: {
        type:String,
        enum:["fr",'en'],
        default:'fr',
        required: true

    },
    description: {
    type: String,
    },
   state: {
    type :String, 
    enum: ['active','archived'],
    default : 'active'
   },
   downloads : {
    type : Number,
    default:0
   },
   ratings : {
    type: Number,
    default:5,
    max:5,
    min: 0
   }

 
},options);


const Document = new model("Document", documentSchema);
export default Document;
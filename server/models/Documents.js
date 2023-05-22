import mongoose from "mongoose";

import CustomError from "../utils/Error.js";
//destructure roles

const {Schema, model} = mongoose;

const options= {
    timestamps:true 
}
const documentSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    
    authors:[{
        type: Schema.Types.Mixed,
        required: true
    }],
    university:{
        type : Schema.Types.ObjectId,
        ref: "University"

    },
    date:{
        type: String,
        required:true,
    
    },
    language: {
        type:String,
        required:true
    },
   type: {
    type: String,
    enum:['tp','td','memoire','these','examen'],
    required:true
   },
   state: {
    type :String, 
    enum: ['active','archived'],
    default : 'active'
   }
   

 
},options);


const Document = new model("Document", documentSchema);
export default Document;
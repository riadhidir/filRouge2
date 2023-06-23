import mongoose, { SchemaType } from "mongoose";
import Document from "./Documents.js";
const {Schema , model} = mongoose;
const options = { discriminatorKey: 'type' };

const finaleThesisSchema = new Schema({
    // students:[{
    //     type: String,
    //     required: true
    // }],
    specialty: {
        type: Schema.Types.ObjectId,
        ref:"Specialty",
        required: true
    },
    cycle:{
        type:String,
        enum : ['bachelor','master'],
        required: true
    },
    link:{
        ref:{type: String,required: true},
        url:{type: String,required: true},
    }
},options);
const FinalThesis = Document.discriminator("FinalThesis",finaleThesisSchema);
export default FinalThesis;
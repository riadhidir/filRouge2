import mongoose, { SchemaType } from "mongoose";
import Document from "./Documents.js";
const {Schema , model} = mongoose;
const options = { discriminatorKey: 'type' };

const phdThesisSchema = new Schema({
    // students:[{
    //     type: String,
    //     required: true
    // }],
    specialty: {
        type: Schema.Types.ObjectId,
        ref:"Specialty",
        required: true
    },
    link:{
        ref:{type: String,required: true},
        url:{type: String,required: true},
    }
},options);
const PhdThesis = Document.discriminator("PhdThesis",phdThesisSchema);
export default PhdThesis;
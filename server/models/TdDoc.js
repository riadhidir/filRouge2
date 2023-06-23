import mongoose, { SchemaType } from "mongoose";
import Document from "./Documents.js";
const {Schema , model} = mongoose;

const options = { discriminatorKey: 'type' };
const tdSchema = new Schema({
    // teachers:[{
    //     type: Schema.Types.ObjectId,
    //     ref:'User',
    //     required: true
    // }],
    course: {
        type: Schema.Types.ObjectId,
        ref:"Course",

        required: true
    },
    cycle:{
        type:String,
        enum : ['l1','l2','l3','m1','m2'],
        required: true
    },
    subject:{
        ref:{type: String, required: true},
        url:{type: String, required: true},
    },
    answer:{
        ref:{type: String,required: true},
        url:{type: String,required: true},
        
    }
},options);

// tdSchema.virtual('fileCount').get(function () {
//     return this.subjects.length +  this.answers.length;
//   });
const TdDoc = Document.discriminator("Td",tdSchema);
export default TdDoc;
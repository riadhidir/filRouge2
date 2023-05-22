import mongoose, { SchemaType } from "mongoose";
const {Schema, model} = mongoose;

const options= {
    timestamps:true 
}
const universitySchema = new Schema({
    name: {
        type: String,
        required : true
    },
    admin: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    key: {
        type: String,
        required:true,
        max:5
    },
    state:{
        type: String,
        enum: ['pending', 'active', 'refused', 'suspended'],
        default: "pending"
    },
    accounts:{
        type: Number,
        default: 50
    },
    fields : [{
            type : Schema.Types.ObjectId,
            ref:"Domaine"
    }],
    branches : [{  // filiéres
        type : Schema.Types.ObjectId,
        ref : "Thread"
    }],
    specialties : [{
        type : Schema.Types.ObjectId, 
        ref: "Specialty"
    }]
    ,
    // courses : [{
    //     type : Schema.Types.ObjectId, 
    //     ref: "Course"
    // }],
},options);






const University = new model("University", universitySchema);
export default University; 
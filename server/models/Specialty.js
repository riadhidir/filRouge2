import mongoose from "mongoose";
const {Schema, model} = mongoose;

const options= {
    timestamps:true 
}
const specialtySchema = new Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    // domain: {
    //     type: Schema.Types.ObjectId,
    //     ref: "Domain",
    //     required:true
    // },
    branch: {
        type: Schema.Types.ObjectId,
        ref: "Branch",
        required:true
    }
},options);
const Specialty = new model('Specialty', specialtySchema);
export default Specialty;
import mongoose from "mongoose";
const {Schema, model} = mongoose;

const options= {
    timestamps:true 
}
const courseSchema = new Schema({
    name:{
        type : String,
        unique:true,
        required : true
    },
    cycle: {
        type:String,
        enum:['l1', 'l2','l3','m1','m2'],
        required : true
    },
    field: {
        type:Schema.Types.ObjectId,
        ref: "Field",
        required:true
    },
    branch :{
        type:Schema.Types.ObjectId,
        ref: "Branch",
 
    },
    specialty: {
        type:Schema.Types.ObjectId,
        ref:"Specialty",

    },
    university :{
        type:Schema.Types.ObjectId,

        ref:"University",
        required:true
    }
    , 
    state:{
        type:String,
        enum:['active','disabled'],
                default : 'active'
    }
},options);
const Course = new model('Course', courseSchema);
export default Course;
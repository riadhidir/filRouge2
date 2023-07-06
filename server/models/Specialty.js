import mongoose from "mongoose";
import Course from "./Course.js";
const {Schema, model} = mongoose;

const options= {
    timestamps:true 
}
const specialtySchema = new Schema({
    name:{
        type:String,
        required:true,
     
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
    },
    state: {
        type:String,
        enum: ['active', 'disabled'],
        default: 'active'
    }
    ,
    university: {
        type: Schema.Types.ObjectId,
        ref: 'University',
        required:true
    }
},options);

// Create a compound index on attribute1 and attribute2
specialtySchema.index({ name: 1, university: 1 }, { unique: true });
specialtySchema.pre("deleteOne", { document: true }, async function (next) {
    try {

      const courses = await Course.find({ specialty: this._id })
      courses.map(async (course) => {
        try {
          await course.deleteOne()
        } catch (error) {
          return error
        }
      })
      next()
    } catch (error) {
      next(error)
    }
  })
const Specialty = model('Specialty', specialtySchema);
export default Specialty;
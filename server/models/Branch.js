import mongoose from "mongoose";
import Specialty from "./Specialty.js";
import Course from "./Course.js";
const {Schema ,model} = mongoose;

const options= {
    timestamps:true 
}
const branchSchema = new Schema({

    name :{
        type:String,
        unique:true,
        required:true
    },
    field: {
        type: Schema.Types.ObjectId,
        ref: "Field",
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
branchSchema.index({ name: 1, university: 1 }, { unique: true });

branchSchema.pre("deleteOne", { document: true }, async function (next) {
    try {

      const specialties = await Specialty.find({ branch: this._id })
      specialties.map(async (spc) => {
        try {
          await spc.deleteOne()
        } catch (error) {
          return error
        }
      });
      
      const courses = await Course.find({ branch: this._id })
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
const Branch = new model('Branch',branchSchema);
export default Branch;
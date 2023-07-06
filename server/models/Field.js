import mongoose from "mongoose";
import Branch from "./Branch.js";
import Course from "./Course.js";
const {Schema,model} = mongoose;
const options= {
    timestamps:true 
}
const fieldSchema = new Schema({

    name:{
        type:String,
        required : true,
        unique: true
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
fieldSchema.index({ name: 1, university: 1 }, { unique: true });
fieldSchema.pre("deleteOne", { document: true }, async function (next) {
    try {

      const branches = await Branch.find({ field: this._id })
      branches.map(async (spc) => {
        try {
          await spc.deleteOne()
        } catch (error) {
          return error
        }
      })
      const courses = await Course.find({ field: this._id })
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
const Field = new model('Field',fieldSchema);

export default Field;
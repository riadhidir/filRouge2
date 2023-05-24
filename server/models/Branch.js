import mongoose from "mongoose";
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

const Branch = new model('Branch',branchSchema);
export default Branch;
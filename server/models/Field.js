import mongoose from "mongoose";
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
const Field = new model('Field',fieldSchema);

export default Field;
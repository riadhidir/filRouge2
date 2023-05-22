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
    
},options);
const Domain = new model('Field',fieldSchema);

export default Domain;
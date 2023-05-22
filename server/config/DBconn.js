import mongoose from "mongoose";

const connection = async ()=>{
    try{

        await mongoose.connect(process.env.DB_URI,{
            useUnifiedTopology:true,
            useNewUrlParser:true
        });

    }catch(err){
        console.error(err);
    }
}

export default connection;
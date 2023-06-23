import jwt from "jsonwebtoken";
import  dotenv from 'dotenv'
import User from "../models/User.js";

export const verifyJWT = async(req,res,next)=>{

    const authHeader = req.headers.authorization || req.headers.Authorization; 
    if(!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
    

   const  token = authHeader.split(' ')[1]; //Bearer token

   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,(
    (err,decoded)=>{
        if(err) return res.sendStatus(403)  //invalid token
        req.user = decoded.UserInfo.id;
        req.role = decoded.UserInfo.role;
        req.uni = decoded.UserInfo.uni;
        next();
    }
   ))
   
    
}
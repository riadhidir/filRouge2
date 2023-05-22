import User from "../models/User.js";
import University from "../models/University.js";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import roles from '../config/roles.js'
import { v4 as uuidv4 } from 'uuid';
// import p_generator from "../utils/passwordGenerator.js";
// export const registerAdmin = async (req, res) => {
//     const {
//         f_name,
//         l_name,
//         email,
//         password,
//         university,
//         key,
//         accounts,
//         phone,
//     } = req.body;
//     if (
//         !f_name ||
//         !l_name ||
//         !email ||
//         !password ||
//         !university ||
//         !key ||
//         !phone
//     )
//         return res.status(400).json({ message: "all fields are required" });

//     try {
//         const uniExists = await University.exists({
//             $or: [{ name: university }, { key }],
//         });
//         if (uniExists) return res.sendStatus(409);
//         //check if user exists
//         const userExists = await User.exists({ email });
//         if (userExists) return res.sendStatus(409);

//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);
//         const createdUniversity = await University.create({
//             name: university,
//             key,
//             accounts,
//         });
//         const user = await User.create({
//             f_name,
//             l_name,
//             email,
//             phone,
//             password: hashedPassword,
//             university: createdUniversity._id,
//             role: roles.ADMIN,
//         });
//         res.status(201).json({ success: user });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };


export const register = async (req, res) => {
    const { f_name, l_name, email, password, university, role } = req.body;
    if (!f_name || !l_name || !email || !password || !university || !role)
        return res.status(400).json({ message: "all fields are required" });
    //check if user exists
    try {
        const userExists = await User.exists({ email });
        if (userExists) return res.sendStatus(409);
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await User.create({
            f_name,
            l_name,
            email,
            password: hashedPassword,
            university,
            role,
        });
        res.status(201).json({ success: user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
export const login = async (req, res) => {
    
    
    const { email, password } = req.body;
    if (!email || !password)
        return res.status(400).json({ message: "Field Missing" });
    try {
        const foundUser = await User.findOne({ email });
        if (!foundUser) return res.status(401).json({message: "Wrong username or password"});
        if(foundUser.state === "disabled") return res.status(403).json({message:"Access Denied"});
        const match = await bcrypt.compare(password, foundUser.password);
        if (match) {
            const accessToken = generateAccessToken(
                foundUser._id,
                foundUser.role
            );
            const refreshToken = generateRefreshToken(foundUser._id);
            await User.findByIdAndUpdate(foundUser._id, { refreshToken });
            res.cookie('jwt',refreshToken, { httpOnly:true,sameSite:'None', secure:true, maxAge: 24*60*60*1000});
            // res.cookie("jwt", refreshToken, {
            //     httpOnly: true,
            //     sameSite: true,
            //     maxAge: 24 * 60 * 60 * 1000, //1 day
            // });
  
            res.json({ accessToken });
        } else {
            res.status(401).json({message: 'Wrong username or password'});
        }
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
        console.log(err.message);
    }
};
export const refreshLogin = async (req, res) => {
    const cookies = req.cookies;

    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    try {
        const foundUser = await User.findOne({ refreshToken });
        if (!foundUser) return res.sendStatus(403); //forbidden
        //evaluate jwt
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            (err, decoded) => {
                if (err || foundUser.id !== decoded.id)
                    return res.sendStatus(403);
                const accessToken = generateAccessToken(
                    decoded.id,
                    foundUser.role
                );
                res.json({ accessToken });
            }
        );
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
export const logout = async (req, res) => {
    
    //on client, also delete thee accessToken
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); //successful and no content
    const refreshToken = cookies.jwt;
    try {
        const foundUser = await User.findOne({ refreshToken });
        //is refreshToken in db?
        if (!foundUser) {
            res.clearCookie("jwt", { httpOnly: true, sameSite: true });
            return res.sendStatus(204);
        }
        //delete the refresh token in db
        await User.findByIdAndUpdate(foundUser.id, { refreshToken: "" });
        res.clearCookie("jwt", { httpOnly: true, sameSite: true }); //secure:true - only serves on https
        return res.sendStatus(204);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

//generate tokens
const generateAccessToken = (id, role) => {
    return jwt.sign(
        {
            UserInfo: {
                id,
                role,
            },
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: "1d",
        }
    ); //5-15 min
};
const generateRefreshToken = (id) => {
    return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "1d",
    });
};

export const registerAdmin = async (req, res) => {
    const {
        f_name,
        l_name,
        email,
        university,
        password,
        accounts,
        phone,
    } = req.body;
    if (
        !f_name ||
        !l_name ||
        !email ||
        !university ||
        !phone
    )
        return res.status(400).json({ message: "Missing Field" });

    try {
        const uniExists = await University.exists({name: university });
        if (uniExists) return res.status(409).json({message: "University already exists"});
        //check if user exists
        const userExists = await User.exists({ email });
        if (userExists) return res.status(409).json({message: "Email already Used"});

        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password, salt);
        const key = uuidv4();
        const createdUniversity = await University.create({
            name: university,
            key,
            accounts,
        });
        const user = await User.create({
            f_name,
            l_name,
            email,
            phone,
            password:hashedPassword,
            university: createdUniversity._id,
            role: roles.ADMIN,
            state: 'disabled'
        });
        createdUniversity.admin = user._id;
        createdUniversity.save();
        res.status(200).json({ success: user });
    } catch (err) {
        res.status(500).json({ message: "Server Error"});
        console.log(err.message);
    }
};

export const getAdmins = async (req, res) => {
    const state = req.query.state || "active";
    try {
        const admins = await User.find({role:roles.ADMIN , state});
        res.status(200).json(admins);
    } catch (err) {
        res.status(500).json({message: err.message});
    }

}
export const getUsers = async (req, res) => {
    const role = roles[req.query.role.toUpperCase()] || roles.TEACHER;
    console.log(role);
    try {
        const users = await User.find({role});
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({message: err.message});
    }

}

export const updateUser = async (req, res) => {
    const userID = req.user;
    const {l_name, f_name, email, phone} = req.body;
    try {
        const foundUser = await User.findByIdAndUpdate(userID, {l_name, f_name, email, phone}, {returnDocument: 'after',runValidators: true});
        if(!foundUser) return res.status(404).json({message: "unknown user"});
        res.status(202).json(foundUser);
    } catch (err) {
        res.status(500).json({message: err.message});
    } 
}

export const getUser = async (req,res) => {
    const userID = req.user;

    try {
        // const foundUser = await User.findById(userID);
        // if(!foundUser) return res.status(404).json({message: "user not found"});
        const foundUser = await User.getUser(userID);
        res.status(200).json(foundUser);
    } catch (err) {

        if(err.code === 404) {
            res.status(404).json({message: err.message})
        }else{
            res.status(500).json({message: err.message})
        }
    }
}
import User from "../models/User.js";
import University from "../models/University.js";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import roles from "../config/roles.js";
import sendEmail from "../utils/email.js";
import { v4 as uuidv4 } from "uuid";
import reader from "xlsx";
import p_generator from "../utils/passwordGenerator.js";
import PasswordResetToken from "../models/PasswordResetToken.js";
import { urlencoded } from "express";
import handleCreateResetToken from "../utils/handleCreateResetToken.js";
import Document from "../models/Documents.js";
const NAME_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\d{9,10}$/;
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
    const { f_name, l_name, email, university, role, phone } = req.body;
    if (!f_name || !l_name || !email || !university || !role)
    return res.status(400).json({ message: "all fields are required" });
    
    //check if user exists
    try {
        const userExists = await User.exists({ email });
        if (userExists)
            return res
                .status(409)
                .json({ message: "Email already exists" });
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(p_generator(), salt);
   
      const user =   await User.create({
            f_name,
            l_name,
            email,
            password,
            university,
            role,
            phone,
        });
        await handleCreateResetToken(user.email);

        res.sendStatus(200);
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
        if (!foundUser)
            return res
                .status(401)
                .json({ message: "Wrong username or password" });
        if (foundUser.state === "disabled")
            return res.status(403).json({ message: "Access Denied" });
        const match = await bcrypt.compare(password, foundUser.password);
        if (match ) {
            const accessToken = generateAccessToken(
                foundUser._id,
                foundUser.role,
                foundUser?.university
            );

            const refreshToken = generateRefreshToken(foundUser._id);
            await User.findByIdAndUpdate(foundUser._id, { refreshToken });
            res.cookie("jwt", refreshToken, {
                httpOnly: true,
                sameSite: "None",
                secure: true,
                maxAge: 24 * 60 * 60 * 1000,
            });
            // res.cookie("jwt", refreshToken, {
            //     httpOnly: true,
            //     sameSite: true,
            //     maxAge: 24 * 60 * 60 * 1000, //1 day
            // });

            res.json({ accessToken });
        } else {
            res.status(401).json({ message: "Wrong username or password" });
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
                    foundUser.role,
                    foundUser.university
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
const generateAccessToken = (id, role, uni) => {
    return jwt.sign(
        {
            UserInfo: {
                id,
                role,
                uni,
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

export const generatePasswordResetToken = async () => {
    return jwt.sign({}, process.env.RESET_TOKEN_SECRET, {
        expiresIn: "1h",
    });
};

export const registerAdmin = async (req, res) => {
    const { f_name, l_name, email, university, password, accounts, phone } =
        req.body;
    if (!f_name || !l_name || !email || !university || !phone)
        return res.status(400).json({ message: "Missing Field" });

    try {
        const uniExists = await University.exists({ name: university });
        if (uniExists)
            return res
                .status(409)
                .json({ message: "University already exists" });
        //check if user exists
        const userExists = await User.exists({ email });
        if (userExists)
            return res.status(409).json({ message: "Email already Used" });

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
            password: hashedPassword,
            university: createdUniversity._id,
            role: roles.ADMIN,
            state: "disabled",
        });
        createdUniversity.admin = user._id;
        createdUniversity.save();
        res.status(200).json({ success: user });
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
        console.log(err.message);
    }
};

export const getAdmins = async (req, res) => {
    const state = req.query.state || "active";
    try {
        const admins = await User.find({ role: roles.ADMIN, state });
        res.status(200).json(admins);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getTeachers = async (req, res) => {
    const filter = { role: roles.TEACHER, university: req.params.universityId };

    req.query.q &&
        (filter.$or = [
            { f_name: { $regex: req.query.q, $options: "i" } }, // Match against f_name
            { l_name: { $regex: req.query.q, $options: "i" } }, // Match against l_name
        ]);
        let { page = 1 } = req.query;

        let sort= {}
        req.query.state && req.query.state != 0  && (sort.state = req.query.state);

    try {


        // const count
        const count = await User.countDocuments(filter);
        const totalPages = Math.ceil(count / 10);

        if (page > totalPages) {
            page = totalPages;
        }

        const users = await User.find(
            filter,
            "f_name l_name email phone state"
        ).sort(sort).limit(10).skip(Math.abs((page - 1) * 10));


        res.status(200).json({teachers:users, totalPages,
            count});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getLibrarians = async (req, res) => {
    const filter = {
        role: roles.LIBRARIAN,
        university: req.params.universityId,
    };

    req.query.q &&
        (filter.$or = [
            { f_name: { $regex: req.query.q, $options: "i" } }, // Match against f_name
            { l_name: { $regex: req.query.q, $options: "i" } }, // Match against l_name
        ]);

        let { page = 1 } = req.query;

        let sort= {}
        req.query.state && req.query.state != 0  && (sort.state = req.query.state);


    try {

         // const count
         const count = await User.countDocuments(filter);
         const totalPages = Math.ceil(count / 10);
 
         if (page > totalPages) {
             page = totalPages;
         }
 
        const users = await User.find(
            filter,
            "f_name l_name email phone state"
        );
        res.status(200).json({librarians:users,totalPages,
            count});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const updateUser = async (req, res) => {
    const userID = req.params.userId;
    const { l_name, f_name, email, phone } = req.body;
    
    try {
        const foundUser = await User.findByIdAndUpdate(
            userID,
            { l_name, f_name, email, phone },
            { returnDocument: "after", runValidators: true }
        );
        if (!foundUser)
            return res.status(404).json({ message: "unknown user" });
        res.sendStatus(202);
    } catch (err) {
        if (err.code === 11000) {
            // Handle the duplicate value error for the unique attribute
            res.status(409).json({
                message: "Email already exists",
            });
            
        } else {
            res.status(500).json({ message: err.message });
        }
    }
};

export const getUser = async (req, res) => {
    const userID = req.params.userId;

    try {
        // const foundUser = await User.findById(userID);
        // if(!foundUser) return res.status(404).json({message: "user not found"});
        const foundUser = await User.getUser(userID);
        const docCount = await Document.countDocuments({authors : {$in:[foundUser._id]}})

        res.status(200).json({user:foundUser, docCount});
    } catch (err) {
        if (err.code === 404) {
            res.status(404).json({ message: err.message });
        } else {
            res.status(500).json({ message: err.message });
        }
    }
};

export const ToggleUserState = async (req, res) => {
    // const userID = req.user;
    const userID = req.params.userId;

    const { state } = req.body;

    try {
        // const foundUniversity = await University.findByIdAndUpdate(universityID, {$pull: {fields: {field:fieldID, state:'active'}}});

        const foundUser = await User.findByIdAndUpdate(userID, { state });
        // const foundUniversity = await University.findById(universityID);
        if (!foundUser) return res.sendStatus(400);

        res.sendStatus(200);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
};

export const deleteUser = async (req, res) => {
    const userID = req.params.userId;
    try {
        const userFound = await User.findByIdAndDelete(userID);
        if (!userFound) return res.sendStatus(404);
        res.sendStatus(200);
    } catch (error) {
        res.status(500).json({ message: err.message });
    }
};

export const registerMany = async (req, res) => {
    const { university, role } = req.body;

    const file = req.file;
    let validHeaders = true;
    const workBook = reader.read(file.buffer, { type: "buffer" });

    // Access the first worksheet (index 0)
    const worksheet = workBook.Sheets[workBook.SheetNames[0]];
    //get range of cells
    const range = reader.utils.decode_range(worksheet["!ref"]);

    const colCount = range.e.c - range.s.c + 1;
    const rowCount = range.e.r - range.s.r;

    if (colCount < 4)
        return res.status(400).json({ message: "invalid table form" });
    if (rowCount <= 0)
        return res.status(200).json({ message: "Nothing to add" });

    //validate the form of the table

    if (range.s.c != 0 || range.e.c != 3) validHeaders = false; //check starting point for cols
    if (
        worksheet["A1"].v != "f_name" ||
        worksheet["B1"].v != "l_name" ||
        worksheet["C1"].v != "email" ||
        worksheet["D1"].v != "phone"
    )
        validHeaders = false; //check headers values

    if (!validHeaders)
        return res.status(400).json({
            message: "invalid table form, check table headers's values ",
        });

    const data = reader.utils.sheet_to_json(worksheet);
    //filter out data , valid from not
    let validData = [];
    let unvalidData = [];
    data.map((item) => {
        if (
            NAME_REGEX.test(item.l_name) &&
            NAME_REGEX.test(item.f_name) &&
            EMAIL_REGEX.test(item.email) &&
            PHONE_REGEX.test(item.phone)
        ) {
            validData.push({ ...item, role, university });
        } else {
            unvalidData.push(item);
        }
    });

    //initiate the db population process
    try {
        (async () => {
            const promises = validData.map((item) => processItem(item));
            await Promise.all(promises);
        })();

        res.status(200).json({ validData, unvalidData });
    } catch (error) {
        res.status(500).json({ message: err.message });
    }
};

const processItem = async (item) => {
    // Perform asynchronous operation here
    // Example: Fetch data from an API

    try {
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(p_generator(), salt);
        const user = await User.create({ ...item, password });
        await handleCreateResetToken(user.email);
        return user;
    } catch (err) {
        throw err;
    }
    // return user;
};

export const createResetToken = async (req, res) => {
    const { email } = req.body;
    try {
        await handleCreateResetToken(email);
        res.sendStatus(200);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const resetPassword = async (req, res) => {
    const token = req.query.token;
    const password = req.body.password;
    if (!token || !password)
        return res.status(400).json({ message: "invalid data" });
    try {
        const foundToken = await PasswordResetToken.findOne({ token });

        if (!foundToken)
            return res.status(404).json({ message: "invalid token" });
        const decoded = jwt.verify(token, process.env.RESET_TOKEN_SECRET);
        if (!decoded) return res.status(404).json({ message: "invalid link" });

        const user = await User.findById(foundToken.user);

        if (await bcrypt.compare(password, user.password))
            return res.status(400).json({ message: "cant use old password" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        user.password = hashedPassword;
        await user.save();

        // await foundToken.deleteOne();
        await PasswordResetToken.deleteMany({ user: foundToken.user });
        res.sendStatus(200);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

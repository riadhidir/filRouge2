import Specialty from "../models/Specialty.js";
import University from "../models/University.js";
import User from "../models/User.js";

export const createSpecialty = async (req, res) => {
    const userID = req.user; 
    const { name, branch } = req.body;
    if (!name || !branch) return res.sendStatus(400);
    try {
         //create the new specialty document
         const newSpecialty = await Specialty.create({ name ,branch});
    
         //get the university of the current user initiating this function (admin)
         const currentUser = await User.getUser(userID);
         const university = await University.findById(currentUser.university);
 
         //push the new field value to the univeristy 
         university.specialties.push(newSpecialty._id);
         await university.save();
 
        res.status(200).json(newSpecialty);
    } catch (err) {
        if (err.code === 11000) {
            // Handle the duplicate value error for the unique attribute
            res.status(409).json({
                message: "Duplicate value for unique attribute",
            });
        } else {
        res.status(500).json({ message: err.message });
        }
    }
};

export const deleteSpecialty = async (req, res) => {
    const specialtyID = req.params.specialtyId;
    try {
        const foundSpecialty = await Specialty.findByIdAndDelete(specialtyID);
        if (!foundSpecialty) return res.sendStatus(404);
        res.sendStatus(200);
    } catch (error) {
        res.status(500).json({ message: err.message });
    }
};
export const updateSpecialty = async (req, res) => {
    const specialtyID = req.params.specialtyId;
    const { name, branch } = req.body;
    try {
        const foundSpecialty = await Specialty.findByIdAndUpdate(
            specialtyID,
            { name,branch },
            { returnDocument: "after", runValidators: true }
        );
        res.status(200).json(foundSpecialty);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};
export const getSpecialties = async (req, res) => {
    const branch = req.query.branch ? {branch : req.query.branch} : {};

    try {
        const specialties = await Specialty.find(branch);
        res.status(200).json(specialties);
    } catch (error) {
        res.status(500).json({ message: err.message });
    }
};


export const addSpecialty = async (req, res) => {
    // const userID = req.user;
    const universityID = req.params.universityId;
    const { specialty } = req.body;
    if (!specialty) return res.sendStatus(400);
    try {
        const foundUniversity = await University.findById(universityID);
        if (!foundUniversity) return res.sendStatus(400);
        const specialtyExists = foundUniversity.specialties.includes(specialty);
        if (specialtyExists) {
            res.status(201).json({ message: "specialty already exists" });
        } else {
            foundUniversity.specialties.push(specialty);
            foundUniversity.save();
            res.sendStatus(200);
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const removeSpecialty = async (req, res) => {
    // const userID = req.user;
    const universityID = req.params.universityId;
    const specialtyID = req.params.specialtyId;

    try {
        const foundUniversity = await University.findById(universityID);
        if (!foundUniversity) return res.sendStatus(400);
        const specialtyExists = foundUniversity.specialties.includes(specialtyID);
        if (!specialtyExists) {
            res.status(201).json({ message: "specialty already removed" });
        } else {
            foundUniversity.specialties.pull(specialtyID);
            foundUniversity.save();
            res.sendStatus(200);
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

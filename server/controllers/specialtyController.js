import Branch from "../models/Branch.js";
import Field from "../models/Field.js";
import Specialty from "../models/Specialty.js";

export const createSpecialty = async (req, res) => {
    const univeristyID = req.params.universityId

    const { name, branch } = req.body;
    if (!name || !branch) return res.sendStatus(400);
    try {
         //create the new specialty document
         const newSpecialty = await Specialty.create({ name ,branch, university: univeristyID});
    
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
    // const branch = req.query.branch ? {branch : req.query.branch} : {};
    const universityID = req.params.universityId ;
    try {
        const specialties = await Specialty.find({university:universityID}).populate('branch','name');
        //filters
        const field = await Field.find({university: universityID}, 'name');
        const branch = await Branch.find({university: universityID}, 'name');
        res.status(200).json({main: specialties, filters:{field, branch}});
        // res.status(200).json(specialties);
    } catch (error) {
        res.status(500).json({ message: err.message });
    }
};



export const toggleSpecialtyState = async (req, res) => {
    // const userID = req.user;
    const specialtyID = req.params.specialtyId;

    try {
     
        const foundSpecialty = await Specialty.findByIdAndUpdate(specialtyID, {state: this.state === 'active' ? 'disabled' : 'active'});

        if(!foundSpecialty) return res.sendStatus(404);
        res.sendStatus(200)

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

import mongoose from "mongoose";
import Branch from "../models/Branch.js";
import Course from "../models/Course.js";
import Field from "../models/Field.js";
import Specialty from "../models/Specialty.js";

export const createSpecialty = async (req, res) => {
    const univeristyID = req.params.universityId

    const { name, branch } = req.body;
    if (!name || !branch) return res.status(400).json({message: 'field missing'});
    try {
         //create the new specialty document
         const newSpecialty = await Specialty.create({ name ,branch, university: univeristyID});
    
        res.status(200).json(newSpecialty);
    } catch (err) {
        if (err.code === 11000) {
            // Handle the duplicate value error for the unique attribute
            res.status(409).json({
                message: "Specialty name already exists",
            });
        } else {
            console.log(err)
        res.status(500).json({ message: err.message });
        }
    }
};

export const deleteSpecialty = async (req, res) => {

    const specialtyID = req.params.specialtyId;
    try {
        const foundSpecialty = await Specialty.findById(specialtyID);
        if (!foundSpecialty) return res.sendStatus(404);
        await foundSpecialty.deleteOne(); 
        res.sendStatus(200);
    } catch (error) {
        res.status(500).json({ message: err.message });
    }
};
export const updateSpecialty = async (req, res) => {
    // console.log(req.body)
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
        if (err.code === 11000) {
            // Handle the duplicate value error for the unique attribute
            res.status(409).json({
                message: "Specialty name already exists",
            });
        } else {
            console.log(err)
        res.status(500).json({ message: err.message });
        }
    }
};
export const getSpecialties = async (req, res) => {
    // const branch = req.query.branch ? {branch : req.query.branch} : {};
    const universityID = req.params.universityId ;

    const filter= {university: universityID};

    req.query.q && (filter.name = { $regex: req.query.q, $options: "i" });
 
    // req.query.field && (filter.field = req.query.field);
    req.query.branch && (filter.branch = req.query.branch);
    let sort={}
    req.query.state && req.query.state != 0  && (sort.state = req.query.state);
    let { page = 1 } = req.query;

    try {
             // const count
             const count = await Specialty.countDocuments(filter);
             const totalPages = Math.ceil(count / 10);
     
             if (page > totalPages) {
                 page = totalPages;
             }
     
        const specialties = await Specialty.find(filter).populate('branch','name').sort(sort).limit(10).skip(Math.abs((page - 1) * 10)).lean();
        //filters
        const field = await Field.find({university: universityID}, 'name ');
        const branch = await Branch.find({university: universityID}, 'name field');

        const courses = await Course.aggregate([
            {
                $match : {
                                university: new  mongoose.Types.ObjectId(universityID)
                            }
            },
            {
                        $group :{
                            _id: "$specialty",
                         count: { $sum: 1 }
                        }
                    }

        ])
        
        specialties.forEach((specialty)=>{
            courses.map((course)=>{
                if( course._id !== null && (course._id.toString() === specialty._id.toString()) ){
                    specialty.subCount = course.count  
                } 
            })
        });
        res.status(200).json({main: specialties, filters:{field, branch}, totalPages,
            count});
        // res.status(200).json(specialties);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



export const toggleSpecialtyState = async (req, res) => {
    // const userID = req.user;
    const specialtyID = req.params.specialtyId;
    const {state} = req.body;
    try {
     
        const foundSpecialty = await Specialty.findByIdAndUpdate(specialtyID, {state});

        if(!foundSpecialty) return res.sendStatus(404);
        res.sendStatus(200)

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

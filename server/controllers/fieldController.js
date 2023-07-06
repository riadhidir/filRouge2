import Branch from "../models/Branch.js";
import Field from "../models/Field.js";
import University from "../models/University.js";
import User from "../models/User.js";
import Document from "../models/Documents.js";
import Course from "../models/Course.js";
import mongoose from "mongoose";
export const createField = async (req, res) => {
    // const userID = req.user;
    const universityID = req.params.universityId;
    const { name } = req.body;

    if (!name) return res.sendStatus(400);
    try {
        const newField = await Field.create({ name, university: universityID });
        res.sendStatus(200);
    } catch (err) {
        if (err.code === 11000) {
            // Handle the duplicate value error for the unique attribute
            res.status(409).json({
                message: "field name already exists",
            });
        } else {
            res.status(500).json({ message: err.message });
        }
    }
};

export const updateField = async (req, res) => {
    const fieldID = req.params.fieldId;
    const { name } = req.body;

    try {
        const foundField = await Field.findByIdAndUpdate(
            fieldID,
            { name },
            { returnDocument: "after", runValidators: true }
        );
        res.status(200).json(foundField);
    } catch (err) {
        if (err.code === 11000) {
            // Handle the duplicate value error for the unique attribute
            res.status(409).json({
                message: "field name already exists",
            });
        } else {
            res.status(500).json({ message: err.message });
        }
    }
};
export const getFields = async (req, res) => {
    const universityID = req.params.universityId;
    // console.log(universityID);
    const filter = { university: universityID };

    req.query.q && (filter.name = { $regex: req.query.q, $options: "i" });
    let sort = {};
    req.query.state && req.query.state != 0 && (sort.state = req.query.state);

    // req.query.state && (filter.state = req.query.state);
    const { state = 0 } = req.query;
    let { page = 1 } = req.query;

    try {
        // const count
        const count = await Field.countDocuments(filter);
        const totalPages = Math.ceil(count / 10);

        if (page > totalPages) {
            page = totalPages;
        }

        const fields = await Field.find(filter)
            .sort(sort)
            .limit(10)
            .skip(Math.abs((page - 1) * 10))
            .lean();
        const courses = await Course.aggregate([
            {
                $match: {
                    university: new mongoose.Types.ObjectId(universityID),
                },
            },
            {
                $group: {
                    _id: "$field",
                    count: { $sum: 1 },
                },
            },
        ]);

        fields.forEach((field) => {
            courses.map((course) => {
                if ((course._id.toString() === field._id.toString()) ) {
                    field.subCount = course.count;
                
                }
            });
        });
 
        res.status(200).json({ main: fields, totalPages, count, courses });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getField = async (req, res) => {
    const fieldID = req.params.fieldId;
    const { name } = req.body;
    try {
        const fields = await Field.findByIdAndUpdate(fieldID, { name });
        res.status(200).json(fields);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// export const addField = async (req, res) => {
//     // const userID = req.user;
//     const universityID = req.params.universityId;
//     const { field } = req.body;
//     if (!field) return res.sendStatus(400);
//     try {
//         // const foundUniversity = await University.findByIdAndUpdate(universityID, { fields: { $elemMatch: { field } }});

//         const foundUniversity = await University.findOne({
//             _id: universityID,
//             'fields.field': { $in: [field] }
//           });
//         if (foundUniversity) {
//             res.status(201).json({ message: "field already exists" });
//         } else {
//             await University.findByIdAndUpdate(universityID, {$push: {fields: {field, state:'active'}}});
//             res.sendStatus(200);
//         }
//         // res.json(foundUniversity)
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//         console.log(err)
//     }
// };

export const ToggleFieldState = async (req, res) => {
    // const userID = req.user;
    // const universityID = req.params.universityId;

    const fieldID = req.params.fieldId;
    const { state } = req.body;

    try {
        // const foundUniversity = await University.findByIdAndUpdate(universityID, {$pull: {fields: {field:fieldID, state:'active'}}});

        const foundField = await Field.findByIdAndUpdate(fieldID, { state });
        // const foundUniversity = await University.findById(universityID);
        if (!foundField) return res.sendStatus(400);

        res.sendStatus(200);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
};

export const deleteField = async (req, res) => {
    const fieldID = req.params.fieldId;
    try {
        const foundField = await Field.findById(fieldID);
        if (!foundField) return res.sendStatus(404);
        await foundField.deleteOne(); 

        res.sendStatus(200);
    } catch (error) {
        res.status(500).json({ message: err.message });
    }
};

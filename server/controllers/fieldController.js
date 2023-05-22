import Field from "../models/Field.js";
import University from "../models/University.js";
import User from "../models/User.js";

export const createField = async (req, res) => {
    const userID = req.user;

    const { name } = req.body;
    if (!name) return res.sendStatus(400);
    try {
        //create the new field document
        const newField = await Field.create({ name });
        //get the university of the current user initiating this function (admin)
        const currentUser = await User.getUser(userID);
        const university = await University.findById(currentUser.university);

        //push the new field value to the univeristy
        university.fields.push(newField._id);
        await university.save();

        res.status(200).json(newField);
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

export const deleteField = async (req, res) => {
    const fieldID = req.params.fieldId;
    try {
        const foundField = await Field.findByIdAndDelete(fieldID);
        if (!foundField) return res.sendStatus(404);
        res.sendStatus(200);
    } catch (error) {
        res.status(500).json({ message: err.message });
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
        res.status(500).json({ error: err });
    }
};
export const getFields = async (req, res) => {
    try {
        const fields = await Field.find({});
        res.status(200).json(fields);
    } catch (error) {
        res.status(500).json({ message: err.message });
    }
};

export const addField = async (req, res) => {
    // const userID = req.user;
    const universityID = req.params.universityId;
    const { field } = req.body;
    if (!field) return res.sendStatus(400);
    try {
        const foundUniversity = await University.findById(universityID);
        if (!foundUniversity) return res.sendStatus(400);
        const fieldExists = foundUniversity.fields.includes(field);
        if (fieldExists) {
            res.status(201).json({ message: "field already exists" });
        } else {
            foundUniversity.fields.push(field);
            foundUniversity.save();
            res.sendStatus(200);
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const removeField = async (req, res) => {
    // const userID = req.user;
    const universityID = req.params.universityId;
    const fieldID = req.params.fieldId;

    try {
        const foundUniversity = await University.findById(universityID);
        if (!foundUniversity) return res.sendStatus(400);
        const fieldExists = foundUniversity.fields.includes(fieldID);
        if (!fieldExists) {
            res.status(201).json({ message: "field already removed" });
        } else {
            foundUniversity.fields.pull(fieldID);
            foundUniversity.save();
            res.sendStatus(200);
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

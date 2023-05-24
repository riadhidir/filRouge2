import Field from "../models/Field.js";
import University from "../models/University.js";
import User from "../models/User.js";

export const createField = async (req, res) => {
    // const userID = req.user;
    const universityID = req.params.universityId;
    const { name} = req.body;
    
    if (!name ) return res.sendStatus(400);
    try {

        const newField = await Field.create({ name, university: universityID });
        res.sendStatus(200);
    } catch (err) {
        if (err.code === 11000) {
            // Handle the duplicate value error for the unique attribute
            res.status(409).json({
                message: "field already exists",
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
        res.status(500).json({ error: err });
    }
};
export const getFields = async (req, res) => {
    const univeristyID = req.params.universityId
    try {
        const fields = await Field.find({university: univeristyID});
        res.status(200).json({main:fields});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getField = async (req, res) => {
    const fieldID = req.params.fieldId
    const {name} = req.body;
    try {
        const fields = await Field.findByIdAndUpdate( fieldID, {name});
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

    try {

        // const foundUniversity = await University.findByIdAndUpdate(universityID, {$pull: {fields: {field:fieldID, state:'active'}}});

        const foundField = await Field.findByIdAndUpdate(fieldID, {state: this.state === 'active' ? 'disabled' : 'active'});
        // const foundUniversity = await University.findById(universityID);
        if (!foundField) return res.sendStatus(400);
     
        res.sendStatus(200)
    } catch (err) {
        res.status(500).json({ message: err.message });
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
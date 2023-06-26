import University from "../models/University.js";
import User from "../models/User.js";
import Document from "../models/Documents.js";
import roles from "../../client/src/config/roles.js";
import sendEmail from "../utils/email.js";
import Branch from "../models/Branch.js";
import Specialty from "../models/Specialty.js";
import Course from "../models/Course.js";
import Field from "../models/Field.js";
export const getUniversity = async (req, res) => {
    const universityID = req.params.universityId;
    try {
        const foundUni = await University.findById(
            universityID,
            "-specialties -branches -fields"
        ).populate("admin", "f_name l_name email phone");

        const teachersCount = await User.countDocuments({
            university: universityID,
            role: roles.TEACHER,
        });
        const librariansCount = await User.countDocuments({
            university: universityID,
            role: roles.LIBRARIAN,
        });
        const documentCount = await Document.countDocuments({
            university: universityID,
        });
        const fieldCount = await Field.countDocuments({ university: universityID});
        const branchCount = await Branch.countDocuments({ university: universityID});
        const specialtyCount = await Specialty.countDocuments({ university: universityID});
        const courseCount = await Course.countDocuments({ university: universityID});

        if (!foundUni) return res.sendStatus(404);
        res.status(200).json({
            university: foundUni,
            teachersCount,
            librariansCount,
            documentCount,
            fieldCount,
branchCount,
specialtyCount,
courseCount
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getUniversities = async (req, res) => {
    const filter = {};
    req.query.q ? (filter.name = { $regex: req.query.q, $options: "i" }) : {};
    req.query.state ? (filter.state = req.query.state) : {};

    let { page = 1 } = req.query;
    try {
        // const count
        const count = await University.countDocuments(filter);
        const totalPages = Math.ceil(count / 10);

        if (page > totalPages) {
            page = totalPages;
        }
        const universities = await University.find(
            filter,
            "name state accounts"
        )
            .populate("admin", "f_name l_name email phone")
            .limit(10)
            .skip(Math.abs((page - 1) * 10));

        res.status(200).json({
            universities,
            totalPages,
            count,
            currentPage: page,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log(err);
    }
};
/**
 * ! need some work
 */
export const updateUniversity = async (req, res) => {
    const universityID = req.params.universityId;
    const { name, key, accounts } = req.body;
    try {
        const university = await University.findByIdAndUpdate(
            universityID,
            { name, key, accounts },
            { returnDocument: "after", runValidators: true }
        );
        if (!university) return res.sendStatus(404);
        res.status(200).json(university);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const acceptUniversity = async (req, res) => {
    const uniId = req.params.universityId;
    console.log(uniId);
    try {
        const foundUni = await University.findByIdAndUpdate(
            uniId,
            { state: "active" },
            { returnDocument: "after" }
        );
        if (!foundUni)
            return res.status(404).json({ message: "invalid university ID" });
        const uniAdmin = await User.findOneAndUpdate(
            { university: foundUni._id },
            { state: "active" }
        );

        //hadle admin not found
        if (!uniAdmin)
            return res.status(404).json({ message: "admin not found" });

        sendEmail(uniAdmin.email, `your submission has been accepted`);

        res.sendStatus(200);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
export const refuseUniversity = async (req, res) => {
    const uniId = req.params.universityId;
    try {
        const foundUni = await University.findByIdAndUpdate(uniId, {
            state: "refused",
        });
        if (!foundUni)
            return res.status(404).json({ message: "invalid university ID" });
        if (foundUni.state === "active")
            return res.status(400).json({ message: "action not allowed" });
        const uniAdmin = await User.findOneAndUpdate(
            { university: foundUni._id },
            { state: "disabled" }
        );
        //hadle admin not found
        if (!uniAdmin)
            return res.status(404).json({ message: " admin not found" });

        sendEmail(uniAdmin.email, `your submission has not been accepted`);

        res.sendStatus(200);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
export const suspendUniversity = async (req, res) => {
    const uniId = req.params.universityId;

    try {
        const foundUni = await University.findByIdAndUpdate(
            uniId,
            { state: "suspended" },
            { returnDocument: "after" }
        );

        if (!foundUni)
            return res.status(404).json({ message: "invalid university ID" });
        const uniAdmin = await User.findOneAndUpdate(
            { university: foundUni._id },
            { state: "disabled" }
        );

        //hadle admin not found
        if (!uniAdmin)
            return res.status(404).json({ message: "admin not found" });

        sendEmail(uniAdmin.email, `your account has been suspended`);

        res.sendStatus(200);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// export const getUniversityFields = async (req, res) => {
//     const filter = {};
//     req.query.q ? (filter.name = { $regex: req.query.q, $options: "i" }) : {};
//     // req.query.state ? (filter.state =  req.query.state) : {};
//     let { page = 1 } = req.query;

//     const universityID = req.params.universityId;
//     try {
//         const fields = await University.findById(universityID, "_id").populate({
//             path: "fields",
//             select: "name",
//             perDocumentLimit: 10,
//             // options: { skip: Math.abs((page - 1) * 10) },
//         })
//         // .populate({
//         //     path: "branches",
//         //     select: "name",
//         //     perDocumentLimit: 2,
//         //     options: { skip: Math.abs((page - 1) * 10) },
//         // });

//         // const count
//         const count = fields.fields.length;
//         const totalPages = Math.ceil(count / 10);
//         if (page > totalPages) {
//             page = totalPages;
//         }
//         res.status(200).json({ data:fields, totalPages, count, currentPage: page });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

// export const getUniversityBranches = async (req, res) => {
//     const field = req.params.fieldId;
//     const filter = {};
//     req.query.q ? (filter.name = { $regex: req.query.q, $options: "i" }) : {};
//     // req.query.state ? (filter.state =  req.query.state) : {};
//     filter.field = field;
//     let { page = 1 } = req.query;

//     const universityID = req.params.universityId;
//     try {
//         const branches = await University.findById(
//             universityID,
//             "_id"
//         ).populate({
//             path: "branches",
//             select: "name",
//             match:  filter ,
//             options: { skip: Math.abs((page - 1) * 10) },
//             perDocumentLimit: 10
//         });

//         // const count
//         const count = branches.branches.length;
//         const totalPages = Math.ceil(count / 10);
//         if (page > totalPages) {
//             page = totalPages;
//         }
//         res.status(200).json({
//             branches,
//             totalPages,
//             count,
//             currentPage: page,
//         });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };


// export const getUniversitySpecialties = async (req, res) => {
//     const branch = req.params.branchId;
//     const filter = {};
//     req.query.q ? (filter.name = { $regex: req.query.q, $options: "i" }) : {};
//     // req.query.state ? (filter.state =  req.query.state) : {};
//     filter.branch = branch;
//     let { page = 1 } = req.query;

//     const universityID = req.params.universityId;
//     try {
//         const specialties = await University.findById(
//             universityID,
//             "_id"
//         ).populate({
//             path: "specialties",
//             select: "name",
//             match:  filter ,
//             options: { skip: Math.abs((page - 1) * 10) },
//             perDocumentLimit: 10
//         });

//         // const count
//         const count = specialties.specialties.length;
//         const totalPages = Math.ceil(count / 10);
//         if (page > totalPages) {
//             page = totalPages;
//         }
//         res.status(200).json({
//              specialties,
//             totalPages,
//             count,
//             currentPage: page,
//         });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

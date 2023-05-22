import University from "../models/University.js";
import User from "../models/User.js";
import Document from "../models/Documents.js";
import roles from "../../client/src/config/roles.js";
export const getUniversity = async (req, res) => {
    const universityID = req.params.universityId;
    try {
        const foundUni = await University.findById(universityID,'-specialties -branches -fields').populate('admin','f_name l_name email phone');
        const teachersCount = await User.countDocuments({university: universityID, role: roles.TEACHER });
        const librariansCount = await User.countDocuments({university: universityID, role: roles.LIBRARIAN });
        const documentCount = await Document.countDocuments({university: universityID});
        if (!foundUni) return res.sendStatus(404);
        res.status(200).json({
            university : foundUni,
            teachersCount,
    librariansCount,
documentCount,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getUniversities = async (req, res) => {
    const filter = {};
    req.query.q ? (filter.name =   { $regex: req.query.q, $options: "i" } ) : {};
    req.query.state ? (filter.state =  req.query.state) : {};

    let { page = 1 } = req.query;
    try {
        // const count 
        const count = await University.countDocuments(filter);
        const totalPages = Math.ceil(count / 10);

        if (page > totalPages) {
            page = totalPages;
        }
        const universities = await University.find(filter,'name state accounts').populate('admin','f_name l_name email phone')
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
        console.log(foundUni);
        if (!foundUni)
            return res.status(404).json({ message: "invalid university ID" });
        const uniAdmin = await User.findOneAndUpdate(
            { university: foundUni._id },
            { state: "active" }
        );

        //hadle admin not found
        if (!uniAdmin)
            return res.status(404).json({ message: " admin not found" });

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
import Branch from "../models/Branch.js";
import University from "../models/University.js";
import User from "../models/User.js";

export const createBranch = async (req, res) => {
    const userID = req.user; 
    const { name, field } = req.body;
    if (!name || !field)
        return res.status(400).json({ message: "missing field " });
    try { 
        //create the new branch document
        const newBranch = await Branch.create({ name, field });
  
        //get the university of the current user initiating this function (admin)
        const currentUser = await User.getUser(userID);
        const university = await University.findById(currentUser.university);

        //push the new field value to the univeristy 
        university.branches.push(newBranch._id);
        await university.save();

        res.status(200).json(newBranch);
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

export const deleteBranch = async (req, res) => {
    const branchID = req.params.branchId;
    try {
        const foundBranch = await Branch.findByIdAndDelete(branchID);
        if (!foundBranch) return res.sendStatus(404);
        res.sendStatus(200);
    } catch (error) {
        res.status(500).json({ message: err.message });
    }
};
export const updateBranch = async (req, res) => {
    const branchID = req.params.branchId;
    const { name, field } = req.body;
    try {
        const foundBranch = await Branch.findByIdAndUpdate(
            branchID,
            { name, field },
            { returnDocument: "after", runValidators: true }
        );
        res.status(200).json(foundBranch);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};
export const getBranches = async (req, res) => {

    const field = req.query.field ? {field:req.query.field} : {};
    try {
        const branches = await Branch.find(field);
        res.status(200).json(branches);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const addBranch = async (req, res) => {
    // const userID = req.user;
    const universityID = req.params.universityId;
    const { branch } = req.body;
    if (!branch) return res.sendStatus(400);
    try {
        const foundUniversity = await University.findById(universityID);
        if (!foundUniversity) return res.sendStatus(400);
        const branchExists = foundUniversity.branches.includes(branch);
        if (branchExists) {
            res.status(201).json({ message: "branch already exists" });
        } else {
            foundUniversity.branches.push(branch);
            foundUniversity.save();
            res.sendStatus(200);
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const removeBranch = async (req, res) => {
    // const userID = req.user;
    const universityID = req.params.universityId;
    const branchID = req.params.branchId;

    try {
        const foundUniversity = await University.findById(universityID);
        if (!foundUniversity) return res.sendStatus(400);
        const branchExists = foundUniversity.branches.includes(branchID);
        if (!branchExists) {
            res.status(201).json({ message: "branch already removed" });
        } else {
            foundUniversity.branches.pull(branchID);
            foundUniversity.save();
            res.sendStatus(200);
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

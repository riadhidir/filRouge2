import Branch from "../models/Branch.js";
import Field from "../models/Field.js";
import University from "../models/University.js";
import User from "../models/User.js";

export const createBranch = async (req, res) => {
    // const userID = req.user; 
    const universityID = req.params.universityId;

    const { name, field } = req.body;
    if (!name || !field)
        return res.status(400).json({ message: "missing field " });
    try { 
      
        const newBranch = await Branch.create({ name, field , university:universityID});

        res.status(200).json(newBranch);
    } catch (err) {
        if (err.code === 11000) {
            // Handle the duplicate value error for the unique attribute
            res.status(409).json({
                message: "Branch already exists",
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

    // const field = req.query.field ? {field:req.query.field} : {};
    const universityID = req.params.universityId;
    try {
        const branches = await Branch.find({university: universityID}).populate('field','name');
        const field = await Field.find({university: universityID}, 'name');
        res.status(200).json({main: branches, filters:{field}});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


export const toggleBranchState = async (req, res) => {
    // const userID = req.user;

    const branchID = req.params.branchId;

    try {
      
        const foundBranch = await Branch.findByIdAndUpdate(branchID, {state: this.state === 'active' ? 'disabled' : 'active'});
        if(!foundBranch) return res.sendStatus(404);
        res.sendStatus(200)
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

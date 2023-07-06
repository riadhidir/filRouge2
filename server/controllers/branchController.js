import mongoose from "mongoose";
import Branch from "../models/Branch.js";
import Course from "../models/Course.js";
import Field from "../models/Field.js";
import University from "../models/University.js";
import User from "../models/User.js";

export const createBranch = async (req, res) => {
    // const userID = req.user;
    const universityID = req.params.universityId;

    const { name, field } = req.body;
    if (!name || !field)
        return res.status(400).json({ message: "missing field" });
    try {
        const newBranch = await Branch.create({
            name,
            field,
            university: universityID,
        });

        res.status(200).json(newBranch);
    } catch (err) {
        if (err.code === 11000) {
            // Handle the duplicate value error for the unique attribute
            res.status(409).json({
                message: "Branch name already exists",
            });
        } else {
            console.log(err);
            res.status(500).json({ message: err.message });
        }
    }
};

export const deleteBranch = async (req, res) => {
    const branchID = req.params.branchId;
    try {
        const foundBranch = await Branch.findById(branchID);
        if (!foundBranch) return res.sendStatus(404);
        await foundBranch.deleteOne();
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
        if (err.code === 11000) {
            // Handle the duplicate value error for the unique attribute
            res.status(409).json({
                message: "Branch name already exists",
            });
        } else {
            console.log(err);
            res.status(500).json({ message: err.message });
        }
        // res.status(500).json({ error: err });
    }
};
export const getBranches = async (req, res) => {
    // const field = req.query.field ? {field:req.query.field} : {};
    const universityID = req.params.universityId;
    const filter = { university: universityID };

    req.query.q && (filter.name = { $regex: req.query.q, $options: "i" });

    req.query.field && (filter.field = req.query.field);
    let sort = {};
    req.query.state && req.query.state != 0 && (sort.state = req.query.state);
    let { page = 1 } = req.query;

    try {
        // const count
        const count = await Branch.countDocuments(filter);
        const totalPages = Math.ceil(count / 10);

        if (page > totalPages) {
            page = totalPages;
        }

        const branches = await Branch.find(filter)
            .populate("field", "name")
            .sort(sort)
            .limit(10)
            .skip(Math.abs((page - 1) * 10)).lean();
        const field = await Field.find({ university: universityID }, "name");
        const courses = await Course.aggregate([
            {
                $match: {
                    university: new mongoose.Types.ObjectId(universityID),
                },
            },
            {
                $group: {
                    _id: "$branch",
                    count: { $sum: 1 },
                },
            },
        ]);

        branches.forEach((branch) => {
            courses.map((course) => {
                if ( course._id !== null && (course._id.toString() === branch._id.toString()) ) {
                    branch.subCount = course.count;
                }
            });
        });
        res.status(200).json({
            main: branches,
            filters: { field },
            totalPages,
            count,
            courses
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log(err)
    }
};

export const toggleBranchState = async (req, res) => {
    // const userID = req.user;

    const branchID = req.params.branchId;
    const { state } = req.body;
    try {
        const foundBranch = await Branch.findByIdAndUpdate(branchID, { state });
        if (!foundBranch) return res.sendStatus(404);
        res.sendStatus(200);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

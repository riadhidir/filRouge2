import Course from "../models/Course.js";
import University from "../models/University.js";
import User from "../models/User.js";

export const createCourse = async (req, res) => {
    const userID = req.user;
    const { name, cycle, field, branch, specialty } = req.body;
    if (!name || !cycle || !field || !branch || !specialty)
        return res.status(400).json({ message: "all fields are required" });
    try {
        //create the new course document
        const newCourse = await Course.create({
            name,
            cycle,
            field,
            branch,
            specialty,
        });
        //get the university of the current user initiating this function (admin)
        // const currentUser = await User.getUser(userID);
        // const university = await University.findById(currentUser.university);

        //push the new course value to the univeristy
        // university.courses.push(newCourse._id);
        // await university.save();

        res.status(200).json(newCourse);
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

export const deleteCourse = async (req, res) => {
    const courseID = req.params.courseId;
    try {
        const foundCourse = await Course.findByIdAndDelete(courseID);
        if (!foundCourse) return res.sendStatus(404);
        res.status(200).json(foundCourse);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
export const updateCourse = async (req, res) => {
    const courseID = req.params.courseId;
    const { name, cycle, field, branch, specialty } = req.body;
    if (!name || !cycle || !field || !branch || !specialty);
    try {
        const foundCourse = await Course.findByIdAndUpdate(courseID, {
            name,
            cycle,
            field,
            branch,
            specialty,
        });
        if (!foundCourse) return res.sendStatus(404);
        res.status(200).json(foundCourse);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
export const getCourses = async (req, res) => {
    const filter = req.query.branch ? { branch: req.query.branch } : {};
    req.query.field ? (filter.field = req.query.field) : {};
    req.query.specialty ? (filter.specialty = req.query.specialty) : {};

    try {
        const Courses = await Course.find(filter);
        res.status(200).json(Courses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
export const getCourse = async (req, res) => {
    const courseID = req.params.courseId;
    try {
        const foundCourse = await Course.findById(courseID);
        if (!foundCourse) return res.sendStatus(404);
        res.status(200).json(foundCourse);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const addCourse = async (req, res) => {
    // const userID = req.user;
    const universityID = req.params.universityId;
    const { course } = req.body;
    if (!course) return res.sendStatus(400);
    try {
        const foundUniversity = await University.findById(universityID);
        if (!foundUniversity) return res.sendStatus(400);
        const courseExists = foundUniversity.courses.includes(course);
        if (courseExists) {
            res.status(201).json({ message: "specialty already exists" });
        } else {
            foundUniversity.courses.push(course);
            foundUniversity.save();
            res.sendStatus(200);
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const removeCourse = async (req, res) => {
    // const userID = req.user;
    const universityID = req.params.universityId;
    const courseID = req.params.courseId;

    try {
        const foundUniversity = await University.findById(universityID);
        if (!foundUniversity) return res.sendStatus(400);
        const courseExists = foundUniversity.courses.includes(courseID);
        if (!courseExists) {
            res.status(201).json({ message: "specialty already removed" });
        } else {
            foundUniversity.courses.pull(courseID);
            foundUniversity.save();
            res.sendStatus(200);
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

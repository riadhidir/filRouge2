import Branch from "../models/Branch.js";
import Course from "../models/Course.js";
import Field from "../models/Field.js";
import Specialty from "../models/Specialty.js";
import University from "../models/University.js";

export const createCourse = async (req, res) => {
    console.log(req.body    )
    const universityID= req.params.universityId;
    const { name, cycle, field, branch, specialty } = req.body;
    if (!name || !cycle || !field)
        return res.status(400).json({ message: "all fields are required" });
    try {
        //create the new course document
        const newCourse = await Course.create({
            name,
            cycle,
            field,
            branch,
            specialty,
            university: universityID,
        });
    
        res.status(200).json(newCourse);
    } catch (err) {
        if (err.code === 11000) {
            // Handle the duplicate value error for the unique attribute
            res.status(409).json({
                message: "Course name already exists",
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
    console.log(req.body)
    const courseID = req.params.courseId;
    const { name, cycle, field, branch, specialty } = req.body;
   
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
        if (err.code === 11000) {
            // Handle the duplicate value error for the unique attribute
            res.status(409).json({
                message: "Course name already exists",
            });
        } else {
            res.status(500).json({ message: err.message });
        }
    }
};
export const getCourses = async (req, res) => {

    const universityID =  req.params.universityId;
    const filter= {university: universityID};

    req.query.q && (filter.name = { $regex: req.query.q, $options: "i" });
    req.query.field && (filter.field = req.query.field);
    req.query.branch && (filter.branch = req.query.branch);
    req.query.specialty && (filter.specialty = req.query.specialty);
    let sort={}
    req.query.state && req.query.state != 0  && (sort.state = req.query.state);
    let { page = 1 } = req.query;

    try {
        
        // const count
        const count = await Course.countDocuments(filter);
        const totalPages = Math.ceil(count / 10);

        if (page > totalPages) {
            page = totalPages;
        }

        const courses = await Course.find(filter).sort(sort).limit(10).skip(Math.abs((page - 1) * 10));
        //filters
        const field = await Field.find({university: universityID}, 'name');
        const branch = await Branch.find({university: universityID}, 'name field');
        const specialty = await Specialty.find({university:universityID},'name branch');
        res.status(200).json({main: courses, filters:{field, branch,specialty},totalPages,
            count});
        // res.status(200).json(courses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
// export const getCourse = async (req, res) => {
//     const courseID = req.params.courseId;
//     try {
//         const foundCourse = await Course.findById(courseID);
//         if (!foundCourse) return res.sendStatus(404);
//         res.status(200).json(foundCourse);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

// export const addCourse = async (req, res) => {
//     // const userID = req.user;
//     const universityID = req.params.universityId;
//     const { course } = req.body;
//     if (!course) return res.sendStatus(400);
//     try {
//         const foundUniversity = await University.findById(universityID);
//         if (!foundUniversity) return res.sendStatus(400);
//         const courseExists = foundUniversity.courses.includes(course);
//         if (courseExists) {
//             res.status(201).json({ message: "specialty already exists" });
//         } else {
//             foundUniversity.courses.push(course);
//             foundUniversity.save();
//             res.sendStatus(200);
//         }
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

export const toggleCourseState = async (req, res) => {
    // const userID = req.user;

    const courseID = req.params.courseId;
    const {state}  =req.body;
    try {
        const foundCourse= await Course.findByIdAndUpdate(courseID, {state});

        if (!foundCourse) return res.sendStatus(400);
        res.sendStatus(200)

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

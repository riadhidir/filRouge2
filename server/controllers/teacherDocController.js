import TdDoc from "../models/TdDoc.js";
import TpDoc from "../models/TpDoc.js";
import ExamDoc from "../models/ExamDoc.js";
import Document from "../models/Documents.js";
import Course from "../models/Course.js";
import Field from "../models/Field.js";
import Branch from "../models/Branch.js";
import Specialty from "../models/Specialty.js";
import User from "../models/User.js";
import mongoose from "mongoose";
export const createDoc = async (req, res) => {
 

    const {
        
        date,
        language,
        type,
        authors,
        course,
        subject,
        cycle,
        answer,
        university,
        description,
    } = req.body;

    try {
        const _course = await Course.findById(course);
        const title = `${_course.name} . ${date}`
        if (type == "Td") {
            await TdDoc.create({
                title,
                authors,
                date,
                language,
                course,
                cycle,

                university,
                subject,
                answer,
                description,
            });
        } else if (type == "Tp") {
            await TpDoc.create({
                title,
                cycle,
                authors,

                date,
                language,
                course,
                university,
                subject,
                answer,
                description,
            });
        } else {
            await ExamDoc.create({
                title,
                authors,
                cycle,

                date,
                language,
                course,
                university,
                subject,
                answer,
                description,
            });
        }

        res.sendStatus(200);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getDocs = async (req, res) => {
    const filter = { type: { $in: ["Td", "Tp", "Exam"] } };
    let universityID;
    req.query.university &&
        (universityID = req.query.university) &&
        (filter.university = req.query.university);

    req.query.author && (filter.author = req.query.author);

    try {
        const foundDocs = await Document.find(filter);
        const course = await Course.find(
            { university: universityID },
            "name cycle field branch specialty"
        );
        //filters
        const field = await Field.find({ university: universityID }, "name");
        const branch = await Branch.find(
            { university: universityID },
            "name field"
        );
        const specialty = await Specialty.find(
            { university: universityID },
            "name branch"
        );
        res.status(200).json({
            main: foundDocs,
            filter: { field, branch, specialty, course },
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log(err.message);
    }
};
export const deleteDoc = async (req, res) => {
    const docID = req.params.docId;
    // console.log('here');
    try {
        const foundDoc = await Document.findByIdAndDelete(docID);
        if (!foundDoc)
            return res.status(400).json({ message: "Document not found" });

        res.sendStatus(200);
    } catch (err) {
        res.json({ message: err.message });
        console.log(err.message);
    }
};

export const ToggleState = async (req, res) => {
    // const userID = req.user;
    // const universityID = req.params.universityId;

    const docID = req.params.docId;
    const { state } = req.body;
    console.log("gere");

    try {
        // const foundUniversity = await University.findByIdAndUpdate(universityID, {$pull: {fields: {field:fieldID, state:'active'}}});

        const foundDoc = await Document.findByIdAndUpdate(docID, { state });
        // const foundUniversity = await University.findById(universityID);
        if (!foundDoc) return res.sendStatus(400);
        console.log(foundDoc);
        res.sendStatus(200);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
};

export const getMyDocs = async (req, res) => {
    const filter = { authors: { $in: [req.user] } };
    const universityID = req.uni;
    // req.query.university && () && (filter.university = req.query.university);;
    // console.log(req.query);
    let { page = 1 } = req.query;
    let sort= {}
    req.query.status && req.query.status != 0  && (sort.state = req.query.status);
    // let { status = 1 } = req.query;

    req.query.cyle && (filter.cyle = req.query.cyle);
    req.query.type && (filter.type = req.query.type);
    req.query.course && (filter.course = req.query.course);
    
    // req.query.author && (filter.author = req.query.author);

    try {

         // const count
         const count = await Document.countDocuments(filter);
         const totalPages = Math.ceil(count / 10);
 
         if (page > totalPages) {
             page = totalPages;
         }
        const foundDocs = await Document.find(filter).sort(sort).limit(10)
        .skip(Math.abs((page - 1) * 10));
        // console.log(foundDocs);
        // const teachers = await User.find({ university: universityID });
        const course = await Course.find(
            { university: universityID },
            "name cycle field branch specialty state"
        );
        //filters
        const field = await Field.find({ university: universityID }, "name state");
        const branch = await Branch.find(
            { university: universityID },
            "name field state"
        );
        const specialty = await Specialty.find(
            { university: universityID },
            "name branch state"
        );
        res.status(200).json({
            main: foundDocs,
            filter: {  field, branch, specialty, course },
            totalPages,
            count
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log(err.message);
    }
};


export const updateDoc = async (req, res) => {
    const docID = req.params.docId;
   
    console.log(docID)
    const {
     
        date,
        language,
        type,
        authors,
        course,
        subject,
        cycle,
        answer,
        university,
        description,
    } = req.body;

    try {
        const oldDoc = await Document.findByIdAndDelete(docID);

        if(!oldDoc) return res.status(404).json({ message:err.message });
        const _course = await Course.findById(course);
        const title = `${_course.name} . ${date}`
        if (type == "Td") {
            await TdDoc.create({
                title,
                authors,
                date,
                language,
                course,
                cycle,

                university,
                subject,
                answer,
                description,
            });
        } else if (type == "Tp") {
            await TpDoc.create({
                title,
                cycle,
                authors,

                date,
                language,
                course,
                university,
                subject,
                answer,
                description,
            });
        } else {
            await ExamDoc.create({
                title,
                authors,
                cycle,

                date,
                language,
                course,
                university,
                subject,
                answer,
                description,
            });
        }

        res.sendStatus(200);
    } catch (err) {
        res.status(500).json({ message: err.message });
        // console.log(err);
    }

};

export const deleteDocs = async (req, res) => {
    
    try {
        const foundDoc = await Document.deleteMany({ _id: {$in : req.body }});
        if (!foundDoc)
            return res.status(400).json({ message: "Document not found" });
        res.sendStatus(200);
    } catch (err) {
        res.json({ message: err.message });
        console.log(err.message);
    }
};
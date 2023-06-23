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
import FinalThesis from "../models/FinalThesis.js";
import PhdThesis from "../models/PhdThesis.js";

export const createDoc = async (req, res) => {
    const {
        title,
        date,
        language,
        type,
        cycle,
        link,
        specialty,
        university,
        description,
    } = req.body;

    try {
        if (type == "FinalThesis") {
            await FinalThesis.create({
                title,
                date,
                language,
                specialty,
                cycle,
                link,
                university,
                description
            });
        } else if (type == "PhdThesis") {
            await PhdThesis.create({
                title,
                date,
                language,
                specialty,
                university,
                link,
                description,
            });
        } 

        res.sendStatus(200);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// meant for public so not done yet
export const getDocs = async (req, res) => {
    const filter = { type: { $in: ["FinalThesis", "PhdThesis"] } };
    let universityID;
    req.query.university &&
        (universityID = req.query.university) &&
        (filter.university = req.query.university);

    // req.query.author && (filter.author = req.query.author);

    try {
        const foundDocs = await Document.find(filter);
      
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
            filter: { field, branch, specialty },
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
    // console.log("gere");

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
    const universityID = req.uni;
    const filter = { type: { $in: ['PhdThesis', 'FinalThesis'] } };  
     filter.university =  universityID  ;  
    // req.query.university && () && (filter.university = req.query.university);;
    // console.log(req.query);
    let { page = 1 } = req.query;
    let sort= {}
    req.query.status && req.query.status != 0  && (sort.state = req.query.status);
    let { status = 1 } = req.query;

    req.query.cyle && (filter.cyle = req.query.cyle);
    req.query.type && (filter.type = req.query.type);
    req.query.specialty && (filter.specialty = req.query.specialty);
    
    // req.query.author && (filter.author = req.query.author);

    try {

         // const count
         const count = await Document.countDocuments(filter);
         const totalPages = Math.ceil(count / 10);
 
         if (page > totalPages) {
             page = totalPages;
         }
        const foundDocs = await Document.find(filter).limit(10)
        .skip(Math.abs((page - 1) * 10)).sort(sort);
        // console.log(foundDocs);
        // const teachers = await User.find({ university: universityID });
      
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
            filter: {  field, branch, specialty },
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
   
    const {
        title,
        date,
        language,
        type,
        cycle,
        authors,
        link,
        specialty,
        university,
        description,
    } = req.body;

    try {
        const oldDoc = await Document.findByIdAndDelete(docID);

        if(!oldDoc) return res.status(404).json({ message:err.message });

        if (type == "FinalThesis") {
            await FinalThesis.create({
                title,
                authors,
                date,
                language,
                specialty,
                cycle,
                link,
                university,
                description
            });
        } else if (type == "PhdThesis") {
            await PhdThesis.create({
                title,
                authors,
                date,
                language,
                specialty,
                university,
                link,
                description,
            });
        } 

        res.sendStatus(200);
    } catch (err) {
        res.status(500).json({ message: err.message });
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
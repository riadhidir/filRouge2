import Document from "../models/Documents";
import Highdoc from "../models/HighDocs";
import Lowdoc from "../models/LowDocs";
import University from "../models/University";

//upload highdocs : tp,td,examen
export const createHighDoc = async (req, res) => {
    const userID = req.user;
    const {
        title,
        university,
        date,
        language,
        type,
        course,
        subjects,
        answers,
    } = req.body;
    if (
        !title ||
        !authors ||
        !university ||
        !date ||
        !language ||
        !type ||
        !course ||
        !subjects ||
        !answers
    )
        return res.sendStatus(400);
    try {
        //get the university of the current user initiating this function
        const currentUser = await User.getUser(userID);
        const foundUniversity = await University.findById(
            currentUser.university
        );
        const hDoc = await Highdoc.create({
            title,
            authors: [userID],
            university: foundUniversity._id,
            date,
            language,
            type,
            course,
            subjects,
            answers,
        });
        res.status(200).json(hDoc);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
//get all highdocs or filter by author or by university
export const getHighDocs = async (req, res) => {
    const filter = req.query.author ? { authors: [req.query.author] } : {};
    req.query.university ? (filter.university = req.query.university) : {};
    filter.state = "active";

    try {
        const docs = await Highdoc.find(filter);
        res.status(200).json(docs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// export const getHighDoc = async (req, res) => {
//     const
//     try {
//         const docs= await Highdocs.find();
//         res.status(200).json(docs);

//     } catch (err) {
//         res.status(500).json({message: err.message});
//     }
// }

//upload lowDocs: memoires, theses

export const updateHighDocs = async (req, res) => {
    const userID = req.user;
    const docID = req.params.docId;
    const { title, date, language, type, course, subjects, answers } = req.body;
    if (
        !title ||
        !authors ||
        !date ||
        !language ||
        !type ||
        !course ||
        !subjects ||
        !answers
    )
        return res.sendStatus(400);
    try {
        const foundDoc = await Highdoc.findByIdAndUpdate(docID, {
            title,
            date,
            language,
            type,
            course,
            subjects,
            answers,
        });
        if (!foundDoc) return res.sendStatus(404);
        res.status(200).json(foundDoc);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const archiveDoc = async (req, res) => {
    const userID = req.user;
    const docID = req.params.docId;
    try {
        const foundDoc = await Document.findByIdAndUpdate(docID, {
            state: "archived",
        });
        if (!foundDoc) return res.sendStatus(404);
        res.sendStatus(200);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const activateDoc = async (req, res) => {
    const userID = req.user;
    const docID = req.params.docId;
    try {
        const foundDoc = await Document.findByIdAndUpdate(docID, {
            state: "active",
        });
        if (!foundDoc) return res.sendStatus(404);
        res.sendStatus(200);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const deleteDoc = async (req, res) => {
    const userID = req.user;
    const docID = req.params.docId;
    try {
        const foundDoc = await Document.findByIdAndDelete(docID);
        if (!foundDoc) return res.sendStatus(404);
        res.sendStatus(200);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const createLowDoc = async (req, res) => {
    const userID = req.user;
    const {
        title,
        university,
        authors,
        date,
        language,
        type,
        description,
        link,
    } = req.body;
    if (
        !title ||
        !authors ||
        !university ||
        !date ||
        !language ||
        !type ||
        !description ||
        !link
    )
        return res.sendStatus(400);
    try {
        //get the university of the current user initiating this function
        const currentUser = await User.getUser(userID);
        const foundUniversity = await University.findById(
            currentUser.university
        );
        const lDoc = await Lowdoc.create({
            title,
            authors: [userID],
            university: foundUniversity,
            date,
            language,
            type,
            description,
            links,
        });
        res.status(200).json(lDoc);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


export const getLowDocs = async (req, res) => {
    // const filter = req.query.author ? { authors: [req.query.author] } : {};
    const filter = req.query.university
        ? (filter.university = req.query.university)
        : {};

    req.query.title ? (filter.title = req.query.title) : {};
    filter.state = "active";

    try {
        const docs = await Lowdoc.find(filter);
        res.status(200).json(docs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

//upload lowDocs: memoires, theses


export const updateLowDocs = async (req, res) => {
    const userID = req.user;
    const docID = req.params.docId;
    const { title, authors, date, language, type, description, link } =
        req.body;
    if (
        !title ||
        !authors ||
        !date ||
        !language ||
        !type ||
        !description ||
        !link
    )
        return res.sendStatus(400);
    try {
        const foundDoc = await Lowdoc.findByIdAndUpdate(docID, {
            title,
            authors,
            date,
            language,
            type,
            description,
            link,
        });
        if (!foundDoc) return res.sendStatus(404);
        res.status(200).json(foundDoc);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

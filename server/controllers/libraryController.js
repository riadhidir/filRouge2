import Branch from "../models/Branch.js";
import Course from "../models/Course.js";
import Field from "../models/Field.js";
import Specialty from "../models/Specialty.js";
import Document from "../models/Documents.js";
export const getFields = async (req, res) => {
    try {
        const fields = await Field.find().distinct("name");
        res.json(fields);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

export const getBranches = async (req, res) => {
    const fieldName = req.query.field || "*";

    try {
        const rawBranches = await Branch.find()
            .populate({
                path: "field",
                select: "name",
                match: {
                    name: fieldName === "*" ? { $exists: true } : fieldName,
                },
            })
            .select("name");

        const filteredBranchesId = rawBranches
            .filter(branch => branch.field !== null)
            .map(branch => branch._id);

        const branches = await Branch.find({
            _id: { $in: filteredBranchesId },
        }).select("name").distinct('name');

        res.json(branches );
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

export const getSpecialties = async (req, res) => {
    const branchName = req.query.branch || "*";

    try {
        const rawSpecialties = await Specialty.find()
            .populate({
                path: "branch",
                select: "name",
                match: {
                    name: branchName === "*" ? { $exists: true } : branchName,
                },
            })
            .select("name");

        const filteredSpecialtiesId = rawSpecialties
            .filter((spc) => spc.branch !== null)
            .map((spc) => spc._id);

        const specialties = await Specialty.find({
            _id: { $in: filteredSpecialtiesId },
        }).select("name").distinct('name');

        res.json(specialties );
    } catch (err) {
        res.status(500).json({ message: err });
    }
};


export const getCourses = async (req, res) => {
    const fieldName = req.query.field || "*";
    const branchName = req.query.branch || "*";
    const specialtyName = req.query.specialty || "*";

    try {

        // const c1 = await Course.find({ branch: { $exists: false, $equal: null } }); 
        const rawCourses = await Course.find()
            .populate({
                path: "field",
                select: "name",
                match: {
                    name: fieldName === "*" ? { $exists: true } : fieldName,
                },
            })
            .populate({
                path: "branch",
                select: "name",
                match: {
                    name: branchName === "*" ? { $exists: false } : branchName,
                    
                },
            })
            .populate({
                path: "specialty",
                select: "name",
                match: {
                    name: specialtyName === "*" ? { $exists: false } : specialtyName,
                },
            })
            .select("name");

        const filteredCoursesId = rawCourses
            .filter((course) => course.field !== null && course.branch !== null && course.specialty !== null)
            .filter((course)=>{
                if(branchName !== "*" ){
                    return  course.branch !== undefined 
                }else{
                    return true

                }
            })
                .filter((course)=>{
                if(specialtyName !== "*" ){
                    return  course.specialty !== undefined 
                }else{
                    return true
                }
            })

            .map((course) => course._id);
                // console.log(filteredCoursesId[1].branch === undefined )
        const courses = await Course.find({
            _id: { $in: filteredCoursesId },
        }).select("name").distinct('name');

        res.json(courses  );
    } catch (err) {
        res.status(500).json({ message: err });
    }
};



export const getDocuments = async (req, res) => {
    let {type='Exam', course, cycle, q} = req.query;
    const filter = {type};
    cycle && (filter.cycle = cycle);
    q && (filter.title = q);
    course || (course = "*");

    let { page = 1 } = req.query;

    // console.log(filter)
    try{

        const count = await Document.countDocuments(filter)
            .populate({
                path: 'authors',
                select: 'f_name l_name'
            })
            .populate({
                path: 'university',
                select: 'name'
            })
            .populate({
                path:'course',
                select: 'name',
                match: {
                    name: course === "*" ? { $exists: true } : course,
                },
            });

            const totalPages = Math.ceil(count / 10);
            if (page > totalPages) {
                page = totalPages;
            }
            const rawDocuments = await Document.find(filter)
            .populate({
                path: 'authors',
                select: 'f_name l_name'
            })
            .populate({
                path: 'university',
                select: 'name'
            })
            .populate({
                path:'course',
                // select: 'name',
                match: {
                    name: course === "*" ? { $exists: true } : course,
                },
            }).limit(10).skip(Math.abs((page - 1) * 10));

        
    
            const filteredDocuments = rawDocuments
            .filter(doc => doc.course !== null)
            // .map(doc => doc._id);
            // console.log(rawDocuments)
        res.json({documents:filteredDocuments,
        count, totalPages, currentPage: page});
    }catch(err) {
        console.log(err)
    res.status(500).json({ message: err});
    }
}


export const downloadDocument = async (req,res)=>{
    const docId = req.params.docId;
    try {
        const doc = await Document.findById(docId);
        if(!doc) return res.status(404).json({ message: "doc not found"});
        doc.downloads+=1;
        await doc.save();
        res.sendStatus(200);
    } catch (err) {
        console.log(err)
        res.status(500).json({ message:err})
    }
}
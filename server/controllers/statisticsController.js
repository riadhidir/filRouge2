import University from '../models/University.js';
import Field from '../models/Field.js';
import Specialty from '../models/Specialty.js';
import Branch from '../models/Branch.js';
import User from '../models/User.js';
import Document from '../models/Documents.js';
import Course from '../models/Course.js';
export const universitiesStats = async(req,res)=>{
    try {

        const filter = {};
        req.params.universityId && (filter.university = req.params.universityId)
        const downloadFilter = req.params.universityId
        ? { $group: {
            _id:  '$university',
            totalDownloads: { $sum: '$downloads' },
          }, } // Include $match stage if filterUniversity is provided
        : {
            $group: {
                _id:  null,
                totalDownloads: { $sum: '$downloads' },
              }
        };
        // const uni = await University.aggregate([
        //     { 
        //         $group: {_id : "$state",
            
        //         count:{$sum:0}
        //     }
        //     }
        
        // ])
        const university_State = await University.aggregate().sortByCount('state');
        const users_State = await User.aggregate(filter).sortByCount('state');
        const users_Role = await User.aggregate(filter).sortByCount('role');
        // const documents_State = await Document.aggregate().sortByCount('state');
        const documents_Type = await Document.aggregate(filter).sortByCount('type');
        const universities = await University.find({state: "active"});
        const university_Count  = await University.countDocuments(filter);
        const users_Count  = await User.countDocuments(filter);
        const documents_Count = await Document.countDocuments(filter);
        const fields  = await Field.countDocuments(filter);
        const branches = await Branch.countDocuments(filter);
        const specialties = await Specialty.countDocuments(filter);
        const courses = await Course.countDocuments(filter);
        const downloads_Count = await Document.aggregate([
           
             
               downloadFilter
            
          ]);
        res.status(200).json({
            Universities:{
                states:university_State,
                count : university_Count,
                data:universities
            },
            Users:{
                states:users_State,
                count : users_Count,
                roles : users_Role
            },
           Documents:{
            // states:documents_State,
            types: documents_Type,
            count: documents_Count,
            downloads : downloads_Count

           },
           Fields:{
            count:fields
           },
           Branches:{
               count:branches,
           },
           Specialties:{count:specialties},
           Courses:{count:courses},

        })
        
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}
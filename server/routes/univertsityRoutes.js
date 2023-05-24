import express from 'express';
import  {acceptUniversity, getUniversities, getUniversity, refuseUniversity, suspendUniversity, updateUniversity } from "../controllers/universityController.js"; 
import {  createField, getFields } from '../controllers/fieldController.js';
import { verifyJWT } from '../middlewares/verifyJWT.js';
import {  createBranch, getBranches } from '../controllers/branchController.js';
import {  createSpecialty, getSpecialties } from '../controllers/specialtyController.js';
import {  createCourse, getCourses } from '../controllers/courseController.js';
const router = express.Router();

/**
 * TODO add authorization
 */

router.get('/', verifyJWT,getUniversities);
router.get('/:universityId', verifyJWT,getUniversity);
router.patch('/:universityId', updateUniversity);

router.patch('/:universityId/accept',verifyJWT,acceptUniversity);
router.patch('/:universityId/refuse',verifyJWT,refuseUniversity);
router.patch('/:universityId/suspend',verifyJWT,suspendUniversity);

router.post('/:universityId/fields',createField);
router.get('/:universityId/fields',verifyJWT,getFields);
// router.delete('/:universityId/fields',verifyJWT,deleteField);

router.post('/:universityId/branches',verifyJWT,createBranch);
router.get('/:universityId/branches',verifyJWT,getBranches);
// router.delete('/:universityId/branches',verifyJWT,deleteBranch);

router.post('/:universityId/specialties',verifyJWT,createSpecialty);
router.get('/:universityId/specialties',verifyJWT,getSpecialties);
// router.delete('/:universityId/specialties',verifyJWT,deleteSpecialty);

router.post('/:universityId/courses',verifyJWT,createCourse);
router.get('/:universityId/courses',verifyJWT,getCourses);




// router.get('/:universityId/fields',verifyJWT,getUniversityFields);
// router.get('/:universityId/fields/:fieldId/branches',verifyJWT,getUniversityBranches);
// router.patch('/:universityId/branches/:branchId/specialties',verifyJWT,getUniversitySpecialties);


// univertyid/fileds/fieldId/branches/branchID/specialties/id
export default router;
import express from 'express';
import  {acceptUniversity, getUniversities, getUniversity, refuseUniversity, suspendUniversity, updateUniversity } from "../controllers/universityController.js"; 
import { addField, removeField } from '../controllers/fieldController.js';
import { verifyJWT } from '../middlewares/verifyJWT.js';
import { addBranch, removeBranch } from '../controllers/branchController.js';
import { addSpecialty, removeSpecialty } from '../controllers/specialtyController.js';
import { addCourse, removeCourse } from '../controllers/courseController.js';
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

router.patch('/:universityId/fields',verifyJWT,addField);
router.patch('/:universityId/fields/:fieldId',verifyJWT,removeField);

router.patch('/:universityId/branches',verifyJWT,addBranch);
router.patch('/:universityId/branches/:branchId',verifyJWT,removeBranch);

router.patch('/:universityId/specialties',verifyJWT,addSpecialty);
router.patch('/:universityId/specialties/:specialtyId',verifyJWT,removeSpecialty);

router.patch('/:universityId/courses',verifyJWT,addCourse);
router.patch('/:universityId/courses/:courseId',verifyJWT,removeCourse);


// univertyid/fileds/fieldId/branches/branchID/specialties/id
export default router;
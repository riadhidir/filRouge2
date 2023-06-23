import Express  from "express";

import { getBranches, getCourses, getFields, getSpecialties, getDocuments, downloadDocument } from "../controllers/libraryController.js";
 
const router = Express.Router();

// router.post('/', verifyJWT,createField);
router.get('/fields', getFields);
router.get('/branches', getBranches);
router.get('/specialties', getSpecialties);
router.get('/courses', getCourses);
router.get('/Documents', getDocuments);
router.put('/Documents/:docId', downloadDocument);



// router.get('/', verifyJWT,getFields);

export default router;
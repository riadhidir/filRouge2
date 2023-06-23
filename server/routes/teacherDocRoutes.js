import Express  from "express";

import { verifyJWT } from "../middlewares/verifyJWT.js";
import { ToggleState, createDoc, deleteDoc, deleteDocs, getDocs, getMyDocs, updateDoc } from "../controllers/teacherDocController.js";

const router = Express.Router();

// router.post('/',verifyJWT,createSpecialty);
router.post('/teacherDocs',verifyJWT, createDoc);
router.get('/teacherDocs',verifyJWT, getDocs);
router.get('/myteacherDocs',verifyJWT, getMyDocs);
router.delete('/teacherDocs/:docId',verifyJWT, deleteDoc);
router.delete('/teacherDocs',verifyJWT, deleteDocs);
router.patch('/teacherDocs/:docId',verifyJWT, ToggleState);
router.put('/teacherDocs/:docId',verifyJWT, updateDoc);


// router.get('/', verifyJWT,getSpecialties);

export default router;